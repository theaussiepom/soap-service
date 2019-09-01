// Execution entry point / root exports for the package
// Do not put code in this file !
// Export anything that should be public

export { ConnectionConfig, execute, SoapMethod } from "./service/client";
export { MockServer, MockServerStatus } from "./service/mock-server";
export { Client } from "soap";
