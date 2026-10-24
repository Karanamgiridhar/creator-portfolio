import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const PORT = 8000;
console.log(`[Deno Server] Serving creator portfolio on http://localhost:${PORT}`);

serve(async (req) => {
  const url = new URL(req.url);
  let filePath = "." + url.pathname;
  if (filePath === "./" || filePath === ".") filePath = "./index.html";

  try {
    const file = await Deno.open(filePath, { read: true });
    let contentType = "text/html";
    if (filePath.endsWith(".css")) contentType = "text/css";
    else if (filePath.endsWith(".js")) contentType = "application/javascript";
    else if (filePath.endsWith(".json")) contentType = "application/json";
    else if (filePath.endsWith(".png")) contentType = "image/png";
    else if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) contentType = "image/jpeg";
    else if (filePath.endsWith(".svg")) contentType = "image/svg+xml";
    else if (filePath.endsWith(".webp")) contentType = "image/webp";

    return new Response(file.readable, {
      headers: { "content-type": contentType },
    });
  } catch {
    return new Response("404 Frame Not Found", { status: 404 });
  }
}, { port: PORT });
