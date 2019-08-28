import { AfterAll, Before, World } from "cucumber";
import { createServer } from "http";
import { Server } from "net";
import { listen } from "soap";
import { ConnectionConfig } from "../index";

interface ServerConfig {
  resetService: () => void;
  serviceDefinition: any;
  serviceUrlPath: string;
  wsdl: string;
  wsdlUrlPath: string;
}

interface ServerStatus {
  config: ConnectionConfig;
  isAvailable: boolean;
}

let server: Server | undefined;
let serviceUrl: string;
let wsdlUrl: string;
let password: string;
let user: string;
let port: number;
let serverConfig: ServerConfig;
let suspended = true;

export const getServerStatus = (): ServerStatus => ({
  config: {
    credentials: password ? {
      password,
      user,
    } : undefined,
    serviceUrl,
    wsdlUrl,
  },
  isAvailable: !suspended,
});

export function configureServer(config: ServerConfig) {
  serverConfig = config;

  AfterAll(() => {
    stop();
  });

  Before(function(this: World) {
    if (typeof (server) === "undefined") {
      start(config);
    }
    reset();
  });
}

function start(config: ServerConfig) {
  wsdlUrl = `${config.wsdlUrlPath}?wsdl`;
  server = createServer((req, res) => {
    const wsdlUrls = [
      wsdlUrl,
      `${config.wsdlUrlPath}?singlewsdl`,
    ];

    if (wsdlUrls.findIndex((s) => s === req.url!.toLowerCase()) >= 0) {
      res.write(config.wsdl.replace(/(?<=soap\d*:address location=".*:)\d{3,}(?=\/)/g, `${server!.address().port}`));
      res.end();
    } else {
      res.end("404: Not Found: " + req.url);
    }
  });

  server.listen(port || 0);

  server.on("listening", () => {
    port = server!.address().port;
    serviceUrl = `http://localhost:${port}`;
  });

  server.on("connection", (socket) => {
    socket.on("data", (data) => {
      const message = data.toString();
      if (message.substr(0, 4) === "POST") {
        const credentialsMatch = message.match(/(?<=Authorization: Basic ).*\b/);
        if (credentialsMatch && credentialsMatch.length) {
          const credentials = new Buffer(credentialsMatch![0], "base64").toString();
          user = credentials.match(/^.*(?=:.*$)/)![0];
          password = credentials.match(/(?<=^.*:).*$/)![0];
        }
      }
    });
  });

  listen(
    server,
    config.serviceUrlPath,
    config.serviceDefinition,
    config.wsdl);
}

function stop() {
  if (typeof (server) !== "undefined") {
    server.close();
    server = undefined;
  }
}

export function suspendService(timeout: number): void {
  if (typeof (server) !== "undefined") {
    process.env.SOAP_TIME_OUT = timeout.toString();
    suspended = true;
    server.close();
  }
}

function resumeService(): void {
  if (suspended) {
    suspended = false;
    process.env.SOAP_TIME_OUT = "120000"; // Default http request timeout
    start(serverConfig);
  }
}

function reset() {
  serverConfig.resetService();
  resumeService();
}
