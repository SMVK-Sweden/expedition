# Next.js + Tailwind CSS Example

This example shows how to use [Tailwind CSS](https://tailwindcss.com/) [(v3.0)](https://tailwindcss.com/blog/tailwindcss-v3) with Next.js. It follows the steps outlined in the official [Tailwind docs](https://tailwindcss.com/docs/guides/nextjs).

## Preview

Preview the example live on [StackBlitz](http://stackblitz.com/):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-tailwindcss)

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss&project-name=with-tailwindcss&repository-name=with-tailwindcss)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-tailwindcss with-tailwindcss-app
# or
yarn create next-app --example with-tailwindcss with-tailwindcss-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

# Hur man sätter upp en lokal databas för utveckling

## setup

1. ladda ner postgres och se till att det finns en server som körs.
2. ha en användare och ett lösenord till postgres. (det finns troligen en defaultanvändare med namn `postgres` och lösenord `postgres`)
3. skapa en fil i roten av projektet med namnet `.env`. Här ska man skriva lösenord osv för databasen och denna fil kommer därför inte att publiceras på github. Kolla vad som står i filen `.gitignore` (som innehåller saker som inte ska publiceras på github osv). I den här filen ska man lägga till följande `DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"`, och såklart ersätta med sin egen användare och sitt eget lösenord (använd `postgres:postgre` om du inte skapar en egen användare och inte har nått värdefullt sparat i postgres redan)

## att använda prisma

### skapa databasen på nytt och fyll den med information från excelfilen (inte allt kommer med hittills, men nästan)

`npx prisma migrate reset`

### Om man gör endring i `prisma/schema.prisma` och vill uppdatera databasen

1. `npx prisma migrate dev` - applicerar ändringen
2. `npx prisma generate` - genererar _PrismaClient_, som blir interfacet till databasen.

### Anropa databasen i koden

**Anropa endast databasen i api-routes**. Man gör det som sagt genom att använda `PrismaClient`. [Se här](https://www.prisma.io/docs/concepts/components/prisma-client/crud)
