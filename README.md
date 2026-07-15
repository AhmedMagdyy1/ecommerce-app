# FreshCart

FreshCart is an online fresh-market e-commerce application built with Angular. It lets users browse products, categories and brands, manage a cart and wishlist, and check out with either cash-on-delivery or online payment.

Built with [Angular CLI](https://github.com/angular/angular-cli) 16, Angular Material, and Bootstrap, against the public [Route E-Commerce API](https://ecommerce.routemisr.com/api/v1).

## Features

### Authentication

- **Sign up** — creates a new account (name, email, password, phone). Phone must be a valid **Egyptian mobile number**: it starts with `01` followed by `0`, `1`, `2`, or `5`, then 8 more digits — 11 digits total.
  Example: **`01012345678`**
  Valid prefixes: `010`, `011`, `012`, `015`.
- **Sign in** — authenticates against the API and stores a JWT in `localStorage` (`userToken`), decoded on load to populate the current user.
- **Forgot password** — a 3-step flow: request a reset code by email, verify the code, then set a new password.
- **Route guard** — `authGuard` protects pages that require a logged-in user (home, products, categories, brands, product details, checkout) and redirects to sign up if no token is present.
- **Logout** — clears the stored token and returns to the login page.

### Catalog

- **Products** — browse all products, view details, and search/filter.
- **Categories** and **Brands** — browse products grouped by category or brand.
- **Wishlist** — save products for later; the navbar shows a live item-count badge.

### Cart & Checkout

- **Cart** — add, update quantity, remove items, or clear the whole cart; the navbar shows a live cart-count badge.
- **Checkout** — enter shipping address, city, and phone, then pay:
  - **Cash on delivery** — creates an order directly.
  - **Online payment** — creates a Stripe checkout session via the API and redirects to the hosted payment page.
- **Orders** — view all past orders.

### Routing

- Hash-based routing (`useHash: true`), so the app can be hosted on any static server without server-side rewrite rules.
- Lazy-loaded `CartModule` for the `/cart` route.
- A wildcard `**` route renders a "Not Found" page for unmatched URLs.

## Getting Started

### Prerequisites

- Node.js and npm
- [Angular CLI](https://angular.io/cli) 16.x

### Installation

```bash
npm install
```

### Development server

Run `ng serve` (or `npm start`) for a dev server, then navigate to `http://localhost:4200/`. The app reloads automatically on source changes.

### Build

Run `ng build` to build the project. Build artifacts are stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Tech Stack

- [Angular 16](https://angular.io/) with Angular Material & CDK
- [Bootstrap 5](https://getbootstrap.com/) for layout/utility styling
- [RxJS](https://rxjs.dev/) for reactive state (cart count, wishlist count, user data)
- [jwt-decode](https://github.com/auth0/jwt-decode) for decoding the auth token
- [SweetAlert2](https://sweetalert2.github.io/) and [ngx-toastr](https://github.com/scttcper/ngx-toastr) for notifications
- [ngx-owl-carousel-o](https://github.com/rignis-git/ngx-owl-carousel-o) for the featured-products carousel
