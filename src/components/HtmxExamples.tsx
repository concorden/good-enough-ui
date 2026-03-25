import type { FC } from "hono/jsx";
import ItemList from "./partials/ItemList";
import type { Item } from "./partials/ItemList";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";
import { Plus } from "lucide";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

const HtmxExamples: FC<{ items: Item[] }> = ({ items }) => (
  <section class="space-y-6 mt-10">
    <h2 class="text-2xl font-bold text-gray-800">HTMX Examples (server round-trips)</h2>

    {/* Item CRUD */}
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-semibold mb-3">Item List</h3>
      <form
        class="mb-4"
        hx-post="/api/items"
        hx-target="#item-list"
        hx-on--after-request="this.reset()"
      >
        <div class="flex gap-2">
          <input
            type="text"
            name="name"
            placeholder="New item name..."
            required
            class="flex-1 rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <Button type="submit">Add</Button>
        </div>
      </form>
      <div id="item-list">
        <ItemList items={items} />
      </div>

      {/* Dialog demo */}
      <div class="mt-4 pt-4 border-t border-border">
        <Dialog>
          <DialogTrigger>
            <Button variant="outline" type="button"><Icon icon={Plus} size={16} /> Add Item (Dialog)</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
              <DialogDescription>
                Enter a name for the new item. It will be added to the list.
              </DialogDescription>
            </DialogHeader>
            <form
              class="space-y-4 pt-4"
              hx-post="/api/items"
              hx-target="#item-list"
              hx-on--after-request="this.reset(); this.dispatchEvent(new CustomEvent('close-dialog', { bubbles: true }))"
            >
              <input
                type="text"
                name="name"
                placeholder="Item name..."
                required
                x-effect="if (open) $nextTick(() => $el.focus())"
                class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <DialogFooter>
                <DialogClose>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Add Item</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>

    {/* Tabs + Card demo */}
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Make changes to your account here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <label class="block">
                <span class="text-sm font-medium">Name</span>
                <input type="text" value="Pedro Duarte" class="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </label>
              <label class="block">
                <span class="text-sm font-medium">Username</span>
                <input type="text" value="@peduarte" class="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </label>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <label class="block">
                <span class="text-sm font-medium">Current password</span>
                <input type="password" class="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </label>
              <label class="block">
                <span class="text-sm font-medium">New password</span>
                <input type="password" class="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </label>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>

    {/* Live Search */}
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-semibold mb-3">Live Search</h3>
      <input
        type="search"
        name="q"
        placeholder="Search items..."
        class="w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        hx-get="/api/search"
        hx-trigger="input changed delay:300ms"
        hx-target="#search-results"
      />
      <div id="search-results" class="mt-3">
        <p class="text-gray-500">Type to search...</p>
      </div>
    </div>
  </section>
);

export default HtmxExamples;
