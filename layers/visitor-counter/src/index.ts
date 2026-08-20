import { app } from "./routes";

export default {
  async fetch(request, env, ctx): Promise<Response> {
    try {
      return await app.fetch(request, env, ctx);
    } catch (error) {
      console.error(JSON.stringify({
        level: "error",
        message: "Unhandled visitor counter API error",
        error: error instanceof Error ? error.message : String(error),
        method: request.method,
        path: new URL(request.url).pathname,
      }));
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;
