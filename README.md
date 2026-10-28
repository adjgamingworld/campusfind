# CampusFind

CampusFind helps students reunite with lost belongings. It is a small,
beginner-friendly, open-source campus lost-and-found project built with Next.js,
TypeScript, Tailwind CSS, and SQLite.

CampusFind seeds a local SQLite database with sample reports. New reports and
item status changes are saved in that database.

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

The database is created at `data/campusfind.db` on first use. To store it
elsewhere, set `CAMPUSFIND_DB_PATH` to an absolute file path before starting the
app. The SQLite file is local to the server and is ignored by Git. Back it up
before deleting it; deleting it removes saved reports and causes sample reports
to be seeded again.

This file-based setup is intended for local development or a server with a
persistent disk. Serverless deployments with temporary filesystems need a
persistent volume or a hosted database to retain reports between instances.

Before opening a pull request, run the checks:

```bash
npm run lint
npm run build
```

## Project structure

- `app/page.tsx` composes the homepage and shared page sections.
- `app/components/site-header.tsx` contains the shared site navigation.
- `app/components/item-card.tsx` renders an item report.
- `app/components/item-listing.tsx` provides client-side item search and filters.
- `app/lib/items.ts` contains item types and the reports used to seed SQLite.
- `app/lib/database.ts` initializes SQLite and reads/writes item records.
- `app/actions.ts` validates and handles report and status updates on the server.
- `app/lib/filter-items.ts` contains the reusable search and filtering logic.
- `app/globals.css` contains the responsive design and global styles.

Keep database access in server-only modules and validate submitted data on the
server. As the project grows, add features in focused components and routes.

## Contributing

CampusFind is designed as a small team project with approachable, independent
pull requests. Start by checking the repository's GitHub Issues for an open
task, or open an issue to discuss a change before starting larger work.

Suggested features for contributors:

1. Add authentication and moderation for public reports.
2. Move to a hosted database for shared deployment.

For a contribution:

1. Choose or discuss an issue so work does not overlap.
2. Create a focused branch from `main`, for example
   `feat/item-search` or `fix/card-layout`.
3. Make a small change that matches the existing component and TypeScript
   patterns.
4. Run `npm run lint` and `npm run build`.
5. Open a pull request describing the change and how it was checked.

Do not commit `.env` files, credentials, the local SQLite database, or real
students' personal information. The current report form does not collect
contact details.
