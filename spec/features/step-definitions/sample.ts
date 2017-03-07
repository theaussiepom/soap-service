// tslint:disable:no-console
import { StepDefinitions, defineSupportCode} from "cucumber";

defineSupportCode((step: StepDefinitions) => {
  step.Given("context", () => {
    console.log("Given");
  });
  step.When("event", () => {
    console.log("When");
  });

  step.Then("outcome", () => {
    console.log("When");
  });
});
