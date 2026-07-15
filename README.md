<div align="center">
  <a href="https://craft-nest-beta.vercel.app/">
    <img src="https://i.ibb.co/JwrWb3bS/Gemini-Generated-Image-dx0d24dx0d24dx0d.png" alt="CraftNest Banner" style="width:100%; border-radius:12px; margin-bottom:1rem;" />
  </a>
  <h1>✨ CraftNest ✨</h1>
  <p><strong>A premium portfolio and marketplace platform for makers and artisans to showcase their crafts.</strong></p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

<hr/>

## 📖 Short Description
CraftNest is a beautifully designed, modern web application that allows users to discover, showcase, and review artisan crafts. With its responsive UI, fluid animations powered by Framer Motion, and robust authentication flow, CraftNest provides an elegant and seamless user experience for both creators and enthusiasts.

## 🚀 Live Demo
- **Frontend Live Demo:** [https://craft-nest-beta.vercel.app/](https://craft-nest-beta.vercel.app/)

## ✨ Features
CraftNest comes packed with the following features (implemented and planned):
- **Authentication:** Powered by Better Auth.
- **Secure APIs:** JWT-secured backend endpoints.
- **Google Login:** "Continue with Google" integrated seamlessly.
- **Email/Password Login:** Secure standard registration and login.
- **User Dashboard:** Dedicated space for users to manage their profiles, items, reviews, and analytics.
- **Admin Dashboard:** Powerful moderation tools to manage users, listings, and view platform-wide analytics.
- **Item Management:** Add, edit, delete, and view your own craft items.
- **Explore Page:** Discover items from across the platform.
- **Search, Filter, Sorting:** Debounced searching, category and price filtering, sorting by price, rating, or newest.
- **Pagination:** Efficient server-side pagination for item browsing.
- **Reviews:** Open rating and review system for items.
- **Analytics:** Visual data representation using Recharts for both users and platform admins.
- **Responsive UI:** A fully responsive layout that looks great on mobile, tablet, and desktop.
- **Animations:** Fluid page transitions and micro-interactions powered by Framer Motion.
- **Dark Mode:** Support for both light and dark themes.
- **Newsletter:** Subscription feature to keep users updated.
- **Blog:** Content platform for articles and updates.
- **Contact:** Secure contact form functionality.
- **Wishlist:** Save your favorite items for later.

## 💻 Technology Stack
This project leverages a modern, robust technology stack:
- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Better Auth**
- **Google Identity Services**
- **Axios**
- **React Hook Form**
- **Zod**
- **Recharts**

## 📂 Folder Structure Overview
```text
craft_nest/
├── app/
│   ├── (public)/          # Public pages (Home, Explore, Details, About, Contact, etc.)
│   ├── (auth)/            # Authentication pages (Login, Register)
│   ├── dashboard/         # Protected dashboard routes (User & Admin)
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global Tailwind CSS and variables
├── components/
│   ├── ui/                # Reusable UI components (Buttons, Inputs, Modals, etc.)
│   ├── layout/            # Navbar, Footer, Sidebar components
│   ├── items/             # Item cards and forms
│   └── charts/            # Recharts components
├── lib/                   # Utility functions, API helpers, ImgBB configuration
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript interfaces and type definitions
├── context/               # Global state contexts (Auth, Theme)
└── public/                # Static assets (Images, Icons)
```

## 🛠️ Installation

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/surayaafroze/Craft_Nest.git
   cd craft_nest
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file based on the environment variables section below.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔐 Environment Variables
Create a `.env.local` file in the root directory and configure the following variables. **Never expose your actual secrets!**

```env
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_IMGBB_API_KEY=
```

## 🔮 Future Improvements
- Enhanced public user profiles.
- Integrated messaging system between users.
- Advanced analytics reporting exports.
- Augmented Reality (AR) viewing for craft items.

## 🤝 Credits
Designed and developed as a premium portfolio showcase.

## 📄 License
This project is licensed under the [MIT License](LICENSE).
