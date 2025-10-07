# Frontend (Portfolio)

A React + Vite frontend for a personal portfolio, product request flow, payments, and contact/subscription.

## Tech
- React 19, Vite 6
- React Router DOM
- Smooth anchor scrolling

## Features
- Product/Solution request form
- Auth (login/signup/forgot)
- Dashboard with payment (Razorpay checkout)
- Responsive layout and mobile menu
- Email subscription form
- Resume link (public/resume (1).pdf)

## Prerequisites
- Node.js 20+ (LTS recommended)
- npm 10+

## Setup

### 1. Install dependencies 
npm install

### 2. Environment file
- Create a .env in the frontend folder with the required variables:
VITE_API_BASE_URL=http://localhost:8000 
VITE_RAZORPAY_KEY_ID=rzp_test_xxx

### 3. Running Locally
- Start the development server:
npm run dev

- Then open the shown URL (typically http://localhost:5173) in your browser.

### 4. Building for Production
- Build optimized static files:
npm run build
The build output will be available in the dist/ folder.

-To preview the build locally:
npm run preview
For actual production deployments (e.g., AWS, Netlify, Vercel, S3, etc.), serve the dist/ folder using a static server such as Nginx, Apache, or the hosting service’s built-in static site hosting.