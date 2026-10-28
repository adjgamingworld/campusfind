import { Suspense } from "react";
import { notFound } from "next/navigation";
import { io } from "next/cache";
import { ItemDetails } from "../../components/item-details";
import { getItemById } from "../../lib/database";
import { sampleItems } from "../../lib/items";

export function generateStaticParams() {
  return sampleItems.map((item) => ({ id: item.id }));
}

export default function ItemPage(props: PageProps<"/items/[id]">) {
  return (
    <Suspense
      fallback={
        <main className="details-page page-shell" aria-busy="true">
          <p role="status">Loading item report...</p>
        </main>
      }
    >
      <ItemPageContent params={props.params} />
    </Suspense>
  );
}

async function ItemPageContent({
  params,
}: {
  params: PageProps<"/items/[id]">["params"];
}) {
  const { id } = await params;
  await io();
  const item = getItemById(id);
  if (!item) notFound();
  return <ItemDetails item={item} />;
}
