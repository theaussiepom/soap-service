import { setDefaultTimeout } from "cucumber";

declare var v8debug;
const isDebugging = typeof v8debug === "object"
  || process.execArgv.findIndex((arg) => /--debug|--inspect/.test(arg)) >= 0;

if (isDebugging) {
  setDefaultTimeout(300000); // 5 minutes
}
