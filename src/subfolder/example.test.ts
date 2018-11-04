import { assert } from "chai";
import { spy } from "sinon";
import { example, exampleWithCallback } from "./example";

describe("An example test", () => {
  it("example says 'hi'", () => {
    const actual = example();
    assert.equal(actual, "him");
  });

  it("exampleWithCallback calls callback", () => {
    const exampleSpy = spy();
    exampleWithCallback(exampleSpy);
    assert.isTrue(exampleSpy.called);
  });
});
