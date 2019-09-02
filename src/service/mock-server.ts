import { AfterAll, Before } from "cucumber";
import { createServer } from "http";
import { Server } from "net";
import { listen } from "soap";
import { ConnectionConfig } from "./client";

export interface MockServerStatus {
  config: ConnectionConfig;
  isAvailable: boolean;
}

interface ServerConfig {
  resetService: () => void;
  serviceDefinition: any;
  serviceUrlPath: string;
  wsdl: string;
  wsdlUrlPath: string;
}

export class MockServer {
  private server: Server | undefined;
  private serviceUrl: string = "";
  private wsdlUrl: string = "";
  private password: string | undefined;
  private user: string | undefined;
  private port: number = 0;
  private serverConfig: ServerConfig;
  private suspended = true;

  constructor(serverConfig: ServerConfig) {
    this.serverConfig = serverConfig;
  }

  public getStatus(): MockServerStatus {
    return {
      config: {
        credentials: this.user && this.password ? {
          password: this.password,
          user: this.user,
        } : undefined,
        serviceUrl: this.serviceUrl,
        wsdlUrl: this.wsdlUrl,
      },
      isAvailable: !this.suspended,
    };
  }

  public initialise() {
    AfterAll(() => {
      this.stop();
    });

    Before(() => {
      if (typeof (this.server) === "undefined") {
        this.startServer();
      }
      this.reset();
    });
  }

  public startServer() {
    this.wsdlUrl = `${this.serverConfig.wsdlUrlPath}?wsdl`;
    this.server = createServer((req, res) => {
      const wsdlUrls = [
        this.wsdlUrl,
        `${this.serverConfig.wsdlUrlPath}?singlewsdl`,
      ];

      if (wsdlUrls.findIndex((s) => s === req.url!.toLowerCase()) >= 0) {
        res.write(this.serverConfig.wsdl.replace(
          /(?<=soap\d*:address location=".*:)\d{3,}(?=\/)/g, `${this.server!.address().port}`));
        res.end();
      } else {
        res.end("404: Not Found: " + req.url);
      }
    });

    this.server.listen(this.port || 0);

    this.server.on("listening", () => {
      this.port = this.server!.address().port;
      this.serviceUrl = `http://localhost:${this.port}`;
    });

    this.server.on("connection", (socket) => {
      socket.on("data", (data) => {
        const message = data.toString();
        const credentialsMatch = message.match(/(?<=Authorization: Basic ).*\b/);
        if (credentialsMatch && credentialsMatch.length) {
          const credentials = new Buffer(credentialsMatch![0], "base64").toString();
          this.user = credentials.match(/^.*(?=:.*$)/)![0];
          this.password = credentials.match(/(?<=^.*:).*$/)![0];
        }
      });
    });

    listen(
      this.server,
      this.serverConfig.serviceUrlPath,
      this.serverConfig.serviceDefinition,
      this.serverConfig.wsdl);
  }

  public suspendService(timeout: number): void {
    if (typeof (this.server) !== "undefined") {
      process.env.SOAP_TIME_OUT = timeout.toString();
      this.suspended = true;
      this.stop();
    }
  }

  private stop() {
    if (typeof (this.server) !== "undefined") {
      this.server.close();
      this.server = undefined;
    }
  }

  private reset() {
    this.serverConfig.resetService();
    this.suspended = false;
    this.user = undefined;
    this.password = undefined;
    delete process.env.SOAP_TIME_OUT;
  }
}
