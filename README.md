# Handcrafted Ecommerce Frontend

A responsive React + TypeScript + Vite storefront prototype inspired by modern marketplace shopping patterns, with a distinct handcrafted visual identity.

## Features

- Responsive homepage with category navigation, search and product cards
- Product categories and search filtering
- Add-to-bag interactions, quantity controls, subtotal and free-shipping progress
- Login, signup and forgot-password screens
- Newsletter form feedback
- Responsive desktop and mobile layouts

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Important: demo authentication

The login/signup/forgot-password interactions are currently frontend demonstrations. They do not verify credentials, create real accounts, send password-reset emails, or securely persist sessions. Connect these screens to the project's authentication API before production. Product data is currently a local sample array; replace it with API responses when the backend is ready. Checkout is a placeholder.
