import { When } from "cucumber";
import { suspendService } from "./support";

When("the legacy data store stops responding", () => {
  return suspendService(100);
});
