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

- **Products** — browse the full catalog with pagination (page numbers plus next/previous, driven by the API's `metadata.numberOfPages`), and view full product details.
- **Search** — live, case-insensitive search-as-you-type by product name on the home page's featured-products section.
- **Sorting** — sort products by price, lowest-to-highest or highest-to-lowest.
- **Filtering** — filter the product list by category or brand (jumping in from the Categories/Brands pages), with an active-filters banner and a one-click "Clear Filters" reset.
- **Categories** and **Brands** — browse products grouped by category or brand.
- **Wishlist** — toggle a product in/out of the wishlist with a heart icon (shown as loading while the request is in flight); the navbar shows a live item-count badge.

### Cart & Checkout

- **Add / remove from cart** — add a product to the cart from the product grid, product details, or wishlist; remove a single item or clear the entire cart.
- **Quantity controls** — increment/decrement an item's quantity in the cart; decrementing to 0 automatically removes the item.
- **Cart badge** — the navbar shows a live cart-item-count badge, kept in sync across pages via a shared `BehaviorSubject`.
- **Checkout** — enter shipping address, city, and phone, then pay:
  - **Cash on delivery** — creates an order directly.
  - **Online payment** — powered by **Stripe**: the API creates a Stripe Checkout session and the user is redirected to Stripe's hosted payment page to complete the purchase.
- **Orders** — view all past orders.

### Routing & Performance

- Hash-based routing (`useHash: true`), so the app can be hosted on any static server without server-side rewrite rules.
- **Lazy loading** — the `CartModule` is lazy-loaded via the router's `loadChildren`, so its code is only downloaded when the user navigates to `/cart`, keeping the initial bundle smaller.
- A wildcard `**` route renders a "Not Found" page for unmatched URLs.

### UX Details

- **Global loading indicator** — an `HttpInterceptor` shows/hides a loader on every outgoing API request.
- **Auth header injection** — the same interceptor attaches the stored token to every outgoing request automatically.
- **Toast notifications** — SweetAlert2 toasts confirm cart/wishlist actions (add/remove) and surface success/error messages during password reset.
- **Title truncation** — a custom `stringTrim` pipe keeps product titles a consistent length across product cards.

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
- [Stripe](https://stripe.com/) Checkout for online payment processing
- [RxJS](https://rxjs.dev/) for reactive state (cart count, wishlist count, user data)
- [jwt-decode](https://github.com/auth0/jwt-decode) for decoding the auth token
- [SweetAlert2](https://sweetalert2.github.io/) and [ngx-toastr](https://github.com/scttcper/ngx-toastr) for notifications
- [ngx-owl-carousel-o](https://github.com/rignis-git/ngx-owl-carousel-o) for the featured-products carousel
