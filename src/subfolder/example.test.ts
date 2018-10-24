import { assert } from "chai";
import { example } from "./example";

describe("An example test", () => {
  it("example says 'hi'", () => {
    const actual = example();
    assert.equal(actual, "hi");
  });
});
