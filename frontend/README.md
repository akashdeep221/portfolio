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
_Developed and tested frontend on Node.js v20.10.0 and npm 10.2.3_

## Setup

### 1. Install dependencies 
npm install

### 2. Environment file
- Create a .env in the frontend folder with the required variables:

```bash
VITE_API_BASE_URL=your_backend_api_base_url
VITE_RAZORPAY_KEY_ID=rzp_test_xxx       # Here’s how to get your Razorpay API keys (Key ID and Key Secret):
                                        # Sign up/log in: https://dashboard.razorpay.com
                                        # Switch to Test Mode (top-right toggle) for development.
                                        # Go to Account & Settings → API Keys.
                                        # Click “Generate Test Key.” You’ll see:
                                        # Key ID (public; can be used on frontend)
                                        # Key Secret (shown once; download/copy it now)
                                        # Add Key Secret to backend .env
                                        # For production, switch to Live Mode and “Generate Live Key,” then update the 
                                        # server’s .env with the live values (do not mix test and live keys).
```

### 3. Running Locally
- Start the development server:
npm run dev
(npm run dev -- --host command can be used if devices on the same network faces problems while connecting to frontend server)

- Then open the shown URL (typically http://localhost:5173) in your browser.

### 4. Building for Production
- Build optimized static files:
npm run build
The build output will be available in the dist/ folder.

-To preview the build locally:
npm run preview
For actual production deployments (e.g., AWS, Netlify, Vercel, S3, etc.), serve the dist/ folder using a static server such as Nginx, Apache, or the hosting service’s built-in static site hosting.