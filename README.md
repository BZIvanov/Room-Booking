This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Cloudinary

To get your credentials (for the next.config file) for using cloudinary you need to register your account and you can find you credentials in the Dashboard.

## Mailtrap

To use the nodemailer package you need to register Mailtrap account.

After account is created go to your Project then your Inbox. From the Integrations dropdown select Node.js Nodemailer. And you will be able to see your credentials.

## Stripe

Register your stripe account to get your credentials. You can find them on your dashboard.

To use the stripe checkout you need to provide company or business name. If you have not created one you can do so by clicking New Business top-left on your stripe dashboard.

#### Stripe webhooks

To work with the webhooks download the Stripe CLI to be able to run commands from the terminal. Stripe CLI is a way to test webhooks locally, for production setup you will need to create endpoint in the webhooks section in the dashboard.

To download and install the CLI follow the instructions from the documentation.

Whereever (folder) you unziped the stripe.exe file, open cmd in that directory and run the below command:

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

Now create new booking on the website and in the cmd you should be able to see triggered events.

**Note** you can not create booking if you don't have the stripe CLI running.
