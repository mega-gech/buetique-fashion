# Mega Boutique - Luxury E-commerce

A premium full-stack e-commerce application for a luxury boutique based in Addis Ababa, Ethiopia.

## Features
- **Elegant UI**: Modern design with Tailwind CSS and Playfair Display typography.
- **Product Catalog**: Dynamic product listing with category filtering and search.
- **Shopping Cart**: Fully functional cart with persistent local storage.
- **Checkout Flow**: Secure-looking checkout process with order summary and validation.
- **Responsive**: Optimized for all screen sizes from mobile to desktop.
- **Backend API**: Node.js/Express backend for handling products, newsletters, and orders.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide React, React Router.
- **Backend**: Node.js, Express, Cors, Dotenv.
- **Styling**: Vanilla CSS (global) + Tailwind CSS (components).

## Getting Started

### Prerequisites
- Node.js installed on your machine.

### Installation
1. Install root dependencies:
   ```bash
   npm install
   ```
2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

### Running the App
Run both frontend and backend concurrently from the root directory:
```bash
npm start
```

The app will be available at `http://localhost:5173` and the server at `http://localhost:5000`.

## Project Structure
- `/src`: React frontend components and pages.
- `/server`: Node.js/Express backend logic and data.
- `/public`: Static assets like icons and logos.
