#!/usr/bin/env node

import { z } from "zod";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "zcaceres/fetch",
    version: "0.1.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  },
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "your_tool_here",
        description: "A tool description",
        inputSchema: {
          type: "object",
          properties: {
            stringParameter: {
              type: "string",
              description: "a parameter",
            },
            objectParameters: {
              type: "object",
              description: "an object parameter",
            },
          },
          required: ["stringParameter"],
        },
      },
    ],
  };
});

const RequestPayloadSchema = z.object({
  stringParameter: z.string(),
  objectParameters: z.object({
    key: z.string(),
  }),
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  const validatedArgs = RequestPayloadSchema.parse(args);

  if (name === "your_tool_here") {
    // Do stuff with `validatedArgs`
    return {
      content: [{ type: "text", text: "Hello, world!" }],
      isError: false,
    };
  }

  throw new Error("Tool not found");
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("Boilerplate MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
