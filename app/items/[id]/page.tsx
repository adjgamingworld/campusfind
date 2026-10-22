import { notFound } from "next/navigation";
import { ItemDetails } from "../../components/item-details";
import { getItemById, items } from "../../lib/items";

export function generateStaticParams() {
  return items.map((item) => ({ id: item.id }));
}

export default async function ItemPage(props: PageProps<"/items/[id]">) {
  const { id } = await props.params;
  const item = getItemById(id);
  if (!item) notFound();
  return <ItemDetails item={item} />;
}
