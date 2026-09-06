# Crumb & Crown Pastry Shop

A responsive Next.js 14 App Router e-commerce application for a pastry business. It includes a mobile-first storefront, filtered product catalog, global cart drawer, multi-step checkout, and backend API skeletons for Safaricom Daraja M-Pesa STK Push payments.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Included features

- Responsive mobile-first layout for phones, tablets, laptops, and desktops.
- Mobile slide-out navigation and desktop navigation bar.
- Product catalog with category filters and price sorting.
- Lazy-loaded product images with Next.js image optimization.
- Global cart state with quantity updates, removal, subtotal, and delivery estimate.
- Multi-step checkout: delivery details, order review, payment selection.
- Mobile money payment UI with Kenyan phone normalization and validation.
- Loading overlay while waiting for the phone PIN prompt / callback confirmation.
- API route skeletons:
  - `POST /api/payment/stk-push`
  - `POST /api/payment/callback`

## Environment variables for production payment integration

```bash
DARAJA_SHORT_CODE=
DARAJA_PASSKEY=
DARAJA_CONSUMER_KEY=
DARAJA_CONSUMER_SECRET=
MPESA_CALLBACK_URL=https://your-domain.com/api/payment/callback
```

The current route prepares and returns a safe demo payload. Before production, add OAuth token retrieval, gateway posting, callback verification, order persistence, and status updates through polling, server-sent events, or websockets.
