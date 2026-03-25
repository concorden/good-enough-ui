import type { FC } from "hono/jsx";

const Layout: FC = ({ children }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Hono + HTMX + Alpine.js Demo</title>
      <link rel="stylesheet" href="/public/styles.css" />
      <script src="https://unpkg.com/htmx.org@2" />
      <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js" />
    </head>
    <body class="min-h-screen">
      <main class="max-w-3xl mx-auto px-4 py-8">
        {children}
      </main>
    </body>
  </html>
);

export default Layout;
