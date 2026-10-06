import { app } from "./app.js";
import { env } from "./shared/config/env.js";

const server = app.listen(env.PORT, () => {
    console.log("API listening on http://localhost:"+env.PORT)
})

function shutdown(signal: string): void {
    console.log({ signal }, "shutting down");
    server.close((error) => process.exit(error?1:0))
}

process.on("SIGINT", () => shutdown("SIGINT"))
process.on("SIGTERM", () => shutdown("SIGTERM"))

