import type { FC } from "hono/jsx";
import { Button } from "../ui/button";

export interface Item {
  id: number;
  name: string;
}

const ItemList: FC<{ items: Item[] }> = ({ items }) => (
  <ul class="space-y-2">
    {items.map((item) => (
      <li key={item.id} class="flex items-center justify-between p-2 rounded bg-gray-50">
        <span>{item.name}</span>
        <Button
          variant="destructive"
          size="sm"
          hx-delete={`/api/items/${item.id}`}
          hx-target="#item-list"
          hx-confirm={`Delete "${item.name}"?`}
        >
          Delete
        </Button>
      </li>
    ))}
  </ul>
);

export default ItemList;
