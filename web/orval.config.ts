import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "../server/swagger.json",
    output: {
      clean: true,
      target: "./src/http/generated/api.ts",
      httpClient: "fetch",
      client: "react-query",
      baseUrl: "http://localhost:3333",
      mode: "tags-split",
    },
  },
});
