# CampusFind

CampusFind helps students reunite with lost belongings. It is a small,
beginner-friendly, open-source campus lost-and-found project built with Next.js,
TypeScript, and Tailwind CSS.

The current version is a frontend scaffold with local sample reports. It has no
backend, authentication, database, or external service integrations.

## Prerequisites

- Node.js 20.9 or newer
- npm
- Git

## Run locally

```bash
git clone https://github.com/adjgamingworld/campusfind.git
cd campusfind
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page
updates as you edit the source.

Before opening a pull request, run the checks:

```bash
npm run lint
npm run build
```

## Project structure

- `app/page.tsx` composes the homepage and shared page sections.
- `app/components/site-header.tsx` contains the shared site navigation.
- `app/components/item-card.tsx` renders a sample item report.
- `app/components/item-listing.tsx` provides client-side item search and filters.
- `app/lib/items.ts` contains the item types and local mock data.
- `app/lib/filter-items.ts` contains the reusable search and filtering logic.
- `app/globals.css` contains the responsive design and global styles.

Keep sample data separate from UI components. As the project grows, add new
features in focused components and routes instead of combining data, behavior,
and presentation in one page.

## Contributing

CampusFind is designed as a small team project with approachable, independent
pull requests. Start by checking the repository's GitHub Issues for an open
task, or open an issue to discuss a change before starting larger work.

Suggested features for contributors:

1. Create a lost/found report form with accessible validation.
2. Add item details and a claim/return status flow.

For a contribution:

1. Choose or discuss an issue so work does not overlap.
2. Create a focused branch from `main`, for example
   `feat/item-search` or `fix/card-layout`.
3. Make a small change that matches the existing component and TypeScript
   patterns.
4. Run `npm run lint` and `npm run build`.
5. Open a pull request describing the change and how it was checked.

Do not commit `.env` files, credentials, or real students' personal information.
Keep reports and contact details as mock data until a privacy-conscious backend
has been designed.
