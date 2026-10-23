export type ItemStatus = "Lost" | "Found" | "Claimed";

export type ItemCategory =
  | "Accessories"
  | "Books & stationery"
  | "Electronics"
  | "ID & keys";

export type CampusItem = {
  id: string;
  name: string;
  category: ItemCategory;
  location: string;
  description?: string;
  reportedAt: string;
  status: ItemStatus;
  art: "blue" | "peach" | "lilac" | "yellow";
};

export const items: CampusItem[] = [
  {
    id: "wireless-earbuds",
    name: "Wireless earbuds",
    category: "Electronics",
    location: "Library, second floor",
    reportedAt: "Today",
    status: "Lost",
    art: "blue",
  },
  {
    id: "canvas-tote",
    name: "Canvas tote bag",
    category: "Accessories",
    location: "Student union",
    reportedAt: "Yesterday",
    status: "Found",
    art: "peach",
  },
  {
    id: "green-notebook",
    name: "Green notebook",
    category: "Books & stationery",
    location: "North lecture hall",
    reportedAt: "Mon, Oct 19",
    status: "Claimed",
    art: "lilac",
  },
  {
    id: "keyring",
    name: "Brass keyring",
    category: "ID & keys",
    location: "Science building",
    reportedAt: "Mon, Oct 19",
    status: "Found",
    art: "yellow",
  },
];
