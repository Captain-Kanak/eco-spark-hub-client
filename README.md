## 🌱 EcoSpark-Hub | Environmental Innovation Marketplace

EcoSpark-Hub is a high-performance, full-stack incubator and marketplace designed to bridge the gap between green visionaries and global supporters. It features a triple-tier ecosystem (Admin, Innovator, Supporter) built to accelerate the transition to a sustainable future through transparent funding and community-voted innovation.

---

### 🚀 Key Features

## 🛡️ Global Admin Suite

- Project Audit Log: Monitor every interaction, idea creation, and transaction across the entire environmental network.
- Category Governance: Full CRUD operations for environmental sectors (e.g., Carbon Capture, Reforestation) with optimized state handling.
- Impact Analytics: Real-time monitoring of total carbon-offset potential, funding growth, and user engagement.
- User Orchestration: Admin can delete any user if needed.

## 💡 Innovator Dashboard

- Idea Incubation: Specialized tools for visionaries to submit project blueprints, including problem statements, solutions, and pricing models.
- Media Integration: Integrated Cloudinary API for high-resolution project renders and profile branding.
- Tracking: Monitor community analytics, total sales and spended.

## 🌍 Supporter Experience

- Innovation Discovery: Advanced filtering by eco-category and real-time search across global green initiatives.
- Impact Checkout: A snapshot-based funding system that preserves project details at the moment of contribution.
- Green Profile: Personalized dashboard to track "Sparked" projects and manage supporter identity.

---

### 🛠 Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + Framer Motion (for premium animations)
- Database/ORM: PostgreSQL + Prisma
- State & Forms: Optimized React Hooks with Server Actions
- Icons & UI: Lucide React, Shadcn UI, Sonner (Toasts)
- Image Hosting: Cloudinary API
- Deployment: Vercel

---

### 🔧 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Captain-Kanak/eco-spark-hub-client
   cd eco-spark-hub-client
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Environment Variables: Create a .env file and add your credentials:
   ```bash
   API_URL="http://localhost:5000"
   NEXT_PUBLIC_API_URL="http://localhost:5000"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="stripe_publishable_key_here"
   ```
4. Start the development server:
   ```bash
   pnpm dev
   ```

---

### 🔒 Core Business Logic

- **Idea Snapshot Integrity:** When a supporter backs an idea, the system takes a "Data Snapshot." This ensures the specific version of the solution and the pricing are locked in the `SupportItems` table, preventing discrepancies if the innovator updates the project later.
- **Community Vetting:** Uses a custom voting logic that influences project visibility on the global feed, ensuring high-impact ideas gain the most traction.
- **Responsive "Eco" UI:** A mobile-first design using a 12-column grid, featuring custom `rounded-[3rem]` geometries and dark-mode support to reflect a modern, sustainable brand identity.

---

## 👤 Author

- Kanak Ray
- Full Stack Developer
- (Node.js · Express.js · TypeScript · PostgreSQL · Prisma)

---

## 📄 License

This project is intended for educational and demonstration purposes.
