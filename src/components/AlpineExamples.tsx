import type { FC } from "hono/jsx";
import { Button } from "./ui/button";

const AlpineExamples: FC = () => (
  <section class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-800">Alpine.js Examples (client-only)</h2>

    {/* Counter */}
    <div class="bg-white rounded-lg shadow p-6" x-data="{ count: 0 }">
      <h3 class="text-lg font-semibold mb-3">Counter</h3>
      <div class="flex items-center gap-4">
        <Button variant="secondary" size="sm" class="font-bold text-lg" x-on:click="count--">
          -
        </Button>
        <span class="text-2xl font-mono w-12 text-center" x-text="count" />
        <Button variant="secondary" size="sm" class="font-bold text-lg" x-on:click="count++">
          +
        </Button>
      </div>
    </div>

    {/* Toggle */}
    <div class="bg-white rounded-lg shadow p-6" x-data="{ open: false }">
      <h3 class="text-lg font-semibold mb-3">Toggle</h3>
      <Button
        x-on:click="open = !open"
        x-text="open ? 'Hide' : 'Show'"
      />
      <div
        x-show="open"
        x-transition=""
        x-cloak=""
        class="mt-4 p-4 bg-indigo-50 rounded border border-indigo-200"
      >
        <p>This content is toggled with Alpine.js — no server round-trip!</p>
      </div>
    </div>

    {/* Live Preview Form */}
    <div class="bg-white rounded-lg shadow p-6" x-data="{ name: '', email: '' }">
      <h3 class="text-lg font-semibold mb-3">Live Preview Form</h3>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <label class="block">
          <span class="text-sm font-medium text-gray-700">Name</span>
          <input
            type="text"
            x-model="name"
            placeholder="Your name"
            class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </label>
        <label class="block">
          <span class="text-sm font-medium text-gray-700">Email</span>
          <input
            type="email"
            x-model="email"
            placeholder="Your email"
            class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </label>
      </div>
      <blockquote class="border-l-4 border-indigo-300 pl-4 text-gray-600" x-cloak="">
        <p>
          Name: <strong x-text="name || '...'" />
        </p>
        <p>
          Email: <strong x-text="email || '...'" />
        </p>
        <p class="text-green-600 font-medium mt-2" x-show="name && email" x-transition="">
          All fields complete!
        </p>
      </blockquote>
    </div>
  </section>
);

export default AlpineExamples;
