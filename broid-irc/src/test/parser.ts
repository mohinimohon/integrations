import test from "ava";
import * as uuid from "node-uuid";
import * as sinon from "sinon";

import Parser from "../core/parser";

import * as groupMessage from "./fixtures/group-message.json";
import * as privateMessage from "./fixtures/private-message.json";

let parser: Parser;
test.before(() => {
  sinon.stub(uuid, "v4", () => {
    return "2eb3b34b-3b23-4488-9879-b03e094d250e";
  });

  sinon.stub(Date, "now", () => {
    return 1483589416000;
  });

  parser = new Parser("testuser", "test_irc_service", "info");
});

test("Parse a group message", async (t) => {
  const data = parser.parse({
    from: "SallyDude",
    message: "hello world",
    to: "#supersecretirc",
  });
  t.deepEqual(await data, groupMessage);
});

test("Parse a private group message", async (t) => {
  const data = parser.parse({
    from: "SallyDude",
    message: "hello world",
    to: "JohnDow",
  });
  t.deepEqual(await data, privateMessage);
});

test("Validate a group message", async (t) => {
  const data = parser.validate(groupMessage);
  t.deepEqual(await data, groupMessage);
});

test("Validate a private message", async (t) => {
  const data = parser.validate(privateMessage);
  t.deepEqual(await data, privateMessage);
});
