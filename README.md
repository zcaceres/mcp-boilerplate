# MCP Server Boilerplate

This project provides a boilerplate for creating a Model Context Protocol (MCP) server. It's designed to help you quickly set up and start developing your own MCP server with minimal configuration.

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   pnpm install
   ```
3. Build the project:
   ```
   pnpm run build
   ```
4. Start the server:
   ```
   pnpm start
   ```

## Development

- Use `npm run dev` to start the TypeScript compiler in watch mode
- Modify `src/index.ts` to add your custom tools and logic

## Customizing Your Server

1. Update the server info in `src/index.ts`:
   ```typescript
   const server = new Server(
     {
       name: "your-server-name",
       version: "your-version",
     },
     // ...
   );
   ```

2. Define your tools in the `ListToolsRequestSchema` handler
3. Implement your tool logic in the `CallToolRequestSchema` handler

### Usage with Desktop App

To integrate this server with a desktop app, add the following to your app's server configuration:

```json
{
  "mcpServers": {
    "your-mcp-server-name-here": {
      "command": "node",
      "args": [
        "{ABSOLUTE PATH TO FILE HERE}/dist/index.js"
      ]
    }
  }
}
```
