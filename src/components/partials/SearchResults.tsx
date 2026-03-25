import type { FC } from "hono/jsx";
import type { Item } from "./ItemList";

const SearchResults: FC<{ items: Item[]; query: string }> = ({ items, query }) => {
  if (!query) return <p class="text-gray-500">Type to search...</p>;
  if (items.length === 0) return <p class="text-gray-500">No results for "{query}"</p>;

  return (
    <ul class="space-y-1">
      {items.map((item) => (
        <li key={item.id} class="p-2 rounded bg-gray-50">{item.name}</li>
      ))}
    </ul>
  );
};

export default SearchResults;
