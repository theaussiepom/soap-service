// tslint:disable:no-console
import { Hooks, defineSupportCode } from "cucumber";

defineSupportCode( (hooks: Hooks) => {
  hooks.Before(() => {
    console.log("Before");
  });
});
