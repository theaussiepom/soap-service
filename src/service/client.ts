import { BasicAuthSecurity, Client, createClient } from "soap";

// tslint:disable-next-line:no-empty-interface
export interface SoapClient extends Client { }

export interface ConnectionConfig {
  credentials?: {
    password: string;
    user: string;
  };
  serviceUrl: string;
  wsdlUrl: string;
}

export type SoapMethod<TInput, TResult> = (
  args: any, callback: (err: any, result: TResult, raw: any, soapHeader: any) => void,
  options?: any, extraHeaders?: any) => void;

export async function execute<TService extends Client, TInput, TResult>(
  config: ConnectionConfig, method: (c: TService) => SoapMethod<TInput, TResult>, input?: TInput): Promise<TResult> {
  async function callService(service: TService): Promise<TResult> {
    return new Promise<TResult>((resolve, reject) => {
      const callback = (err: any, result: TResult) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      };

      const options: any = {};
      if (process.env.SOAP_TIME_OUT) {
        options.timeout = parseInt(process.env.SOAP_TIME_OUT, 10);
      }

      if (typeof (input) === "undefined") {
        // call wcf operations the require no input
        method(service)(callback, options);
      } else {
        // call wcf operations the require input
        method(service)(input, callback, options);
      }
    });
  }

  while (true) {
    try {
      const service = await getServiceClient<TService>(config);
      const result = await callService(service);
      return result;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
}

function getServiceClient<TService extends Client>(config: ConnectionConfig)
  : Promise<TService> {
  return new Promise<TService>((resolve, reject) => {
    createClient(`${config.wsdlUrl}`, {}, (err, c) => {
      /* istanbul ignore next */
      if (err) {
        reject(err);
      } else {
        try {
          /* istanbul ignore if */
          if (config.credentials) {
            c.setSecurity(new BasicAuthSecurity(config.credentials.user, config.credentials.password));
          }
          c.setEndpoint(config.serviceUrl);

          resolve(c as TService);
        } catch (err2) {
          /* istanbul ignore next */
          reject(err2);
        }
      }
    });
  });
}
