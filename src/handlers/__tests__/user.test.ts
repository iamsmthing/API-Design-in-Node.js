//unit testing
import * as user from "../user";
describe("user handler", () => {
  it("should create a new user", async () => {
    // expect(2).toBe(2);
    const req = { body: { username: "usertest3", password: "admin" } };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };
    await user.createNewUser(req, res, () => {});
  });
});
