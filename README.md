# Venoxity Docs

Documentation for [Venoxity](https://venoxity.dev/)

## Prerequisites

* Node 22+
* A package manager
* Git
* Optional if you plan to use AI right away:
  * An OpenAI compatible API key for Vercel AI SDK

## 1) Install dependencies

Clone your repo and install packages with your preferred manager.


**bun**

```bash
bun install
```

**pnpm**

```bash
pnpm install
```

## 2) Environment variables

Create a `.env.local` in the project root.

If using Vercel AI SDK:

```bash
# Choose one provider, example for OpenAI compatible endpoints
OPENAI_API_KEY=sk-...
# Or for Azure/OpenRouter/etc, set the provider vars your app expects
```

If you are not enabling AI, just set a dummy value, like `sk-123`.

## 3) Development

Start the dev server:

**bun**

```bash
bun dev
```

**pnpm**

```bash
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 4) Build and preview

**Build**

```bash
bun run build
# or: pnpm run build
```

**Preview**

```bash
bun start
# or: pnpm start
```

## Learn More

* [Next.js Documentation](https://nextjs.org/docs)
* [Learn Next.js](https://nextjs.org/learn)
* [Fumadocs](https://fumadocs.vercel.app)