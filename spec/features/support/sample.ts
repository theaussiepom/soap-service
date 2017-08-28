// tslint:disable:no-console
import { defineSupportCode, Hooks } from "cucumber";

defineSupportCode((hooks: Hooks) => {
  hooks.Before(() => {
    console.log("Before");
  });
});
