import { expect } from "chai";
import * as request from "supertest";
import { baseURL } from "../api/baseURL";

export const mochaHooks = (): Mocha.RootHookObject => {
  return {
    async beforeAll() {
      // clear the database before each test
      const response = await request(baseURL)
        .get("/api/restoreDB")
        .set("User-Agent", "Chrome");

      expect(response.statusCode).to.be.equal(201);
      console.log("Database restored!");
    },
  };
};
