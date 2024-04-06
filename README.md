## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

````
NEXT_PUBLIC_API_URL=https://api.thenty.io
NEXT_PUBLIC_APP_NAME= // Choose an application name for your session storage. No whitespaces. Ex "thenty-plugin"
NEXT_PUBLIC_APP_SITE_KEY= // Add your site's site key here from thenty dashboard
NEXT_PUBLIC_APP_SECRET_KEY= // Add your site's secret key here from thenty dashboard
```

# Components

## AuthenticationWrapper

Use the authentication wrapper to show the child components only when a user is logged in
