import { assert } from "chai";
import { Given, Then, When } from "cucumber";

Given("context", () => {
  // Do nothing
});

When("event", () => {
  // Do nothing
});

Then("outcome", () => {
  // Do nothing
  const sut = false;
  assert.isTrue(sut);
});
