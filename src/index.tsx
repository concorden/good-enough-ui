import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import type { Item } from "./components/partials/ItemList";
import Layout from "./components/Layout";
import AlpineExamples from "./components/AlpineExamples";
import HtmxExamples from "./components/HtmxExamples";
import ItemList from "./components/partials/ItemList";
import SearchResults from "./components/partials/SearchResults";

// In-memory data store
const items: Item[] = [
  { id: 1, name: "Learn Hono" },
  { id: 2, name: "Try HTMX" },
  { id: 3, name: "Explore Alpine.js" },
];
let nextId = 4;

const app = new Hono();

app.use("/public/*", serveStatic({ root: "./" }));

// Full page
app.get("/", (c) =>
  c.html(
    <Layout>
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Hono + HTMX + Alpine.js</h1>
      <AlpineExamples />
      <HtmxExamples items={items} />
    </Layout>
  )
);

// Item list partial
app.get("/api/items", (c) => c.html(<ItemList items={items} />));

// Add item
app.post("/api/items", async (c) => {
  const form = await c.req.parseBody();
  const name = String(form.name).trim();
  if (name) {
    items.push({ id: nextId++, name });
  }
  return c.html(<ItemList items={items} />);
});

// Delete item
app.delete("/api/items/:id", (c) => {
  const id = Number(c.req.param("id"));
  const idx = items.findIndex((item) => item.id === id);
  if (idx !== -1) items.splice(idx, 1);
  return c.html(<ItemList items={items} />);
});

// Search
app.get("/api/search", (c) => {
  const q = (c.req.query("q") ?? "").toLowerCase();
  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(q)
  );
  return c.html(<SearchResults items={filtered} query={q} />);
});

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Server running at http://localhost:${info.port}`);
});
