export type ItemStatus = "Lost" | "Found" | "Claimed" | "Returned";

export type ItemCategory =
  | "Accessories"
  | "Books & stationery"
  | "Electronics"
  | "ID & keys";

export type CampusItem = {
  id: string;
  name: string;
  description?: string;
  category: ItemCategory;
  location: string;
  reportedAt: string;
  status: ItemStatus;
  art: "blue" | "peach" | "lilac" | "yellow";
};

export type ReportActionState = {
  error: string | null;
  success: string | null;
};

export const sampleItems: CampusItem[] = [
  {
    id: "wireless-earbuds",
    name: "Wireless earbuds",
    description:
      "A white pair of wireless earbuds in a small charging case. They were last seen near the study tables on the second floor of the library.",
    category: "Electronics",
    location: "Library, second floor",
    reportedAt: "Today",
    status: "Lost",
    art: "blue",
  },
  {
    id: "canvas-tote",
    name: "Canvas tote bag",
    description:
      "A natural canvas tote bag with a green campus print. It was found near the student union seating area and is being kept safe for its owner.",
    category: "Accessories",
    location: "Student union",
    reportedAt: "Yesterday",
    status: "Found",
    art: "peach",
  },
  {
    id: "green-notebook",
    name: "Green notebook",
    description:
      "A green spiral notebook with class notes and a few loose pages inside. The owner has already collected it from the lost-and-found desk.",
    category: "Books & stationery",
    location: "North lecture hall",
    reportedAt: "Mon, Oct 19",
    status: "Claimed",
    art: "lilac",
  },
  {
    id: "keyring",
    name: "Brass keyring",
    description:
      "A brass keyring with several keys and a small blue tag. It was found outside the science building and is ready to be claimed.",
    category: "ID & keys",
    location: "Science building",
    reportedAt: "Mon, Oct 19",
    status: "Found",
    art: "yellow",
  },
];
