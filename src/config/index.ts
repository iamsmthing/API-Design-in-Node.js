import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const stage = process.env.STAGE || "local";
let envConfig;

if (stage === "production") {
  envConfig = require("./prod").default;
} else if (stage === "staging") {
  envConfig = require("./staging").default;
  console.log("this is staging");
} else {
  envConfig = require("./local").default;
  console.log("this is local");
}

const defaultConfig = {
  stage,
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbUrl: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET,
};

export default merge(defaultConfig, envConfig);
