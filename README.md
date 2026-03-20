# 🚀 AI Website Builder

AI Website Builder SaaS Platform is an enterprise-grade, full-stack monorepo engineered to automate the transition from conceptualization to deployment. This platform orchestrates an advanced MERN-architecture backend with Prisma ORM and Neon serverless PostgreSQL, integrating OpenRouter’s LLM API to deliver a high-performance, AI-driven website generation engine. Built with a focus on scalability and security, it features robust JWT-based authentication, asynchronous Stripe webhook handling, and a modular frontend designed for seamless user experience and rapid iteration.

### 🔗 **Live Demo:** [View Live App](https://ai-website-builder-saa-s-platform.vercel.app/)

## ✨ Features

* **AI-Powered Generation Engine:** Integrates OpenRouter API to programmatically generate and edit dynamic website layouts, demonstrating advanced API orchestration and prompt handling.

* **Robust Security & Authentication:** Implements secure user authentication with protected API routes, session management, and encrypted data transmission to ensure user privacy and system integrity.

* **Scalable Serverless Database:** Utilizes a Neon serverless PostgreSQL database managed via Prisma ORM, showcasing proficiency in relational database design, migrations, and type-safe data queries.

* **Secure Payment & Webhooks:** Features enterprise-grade Stripe integration for subscription handling, including secure backend webhook listeners to process real-time financial events.

* **Clean Monorepo Architecture:** Maintains a strict separation of concerns with a modular React frontend (`client`) and Express.js backend (`server`), utilizing clean code principles for high maintainability.

* **Responsive & Optimized UI:** Designed with a mobile-first approach, ensuring seamless cross-device compatibility, high accessibility, and a polished, professional user experience.

## 🛠️ Technologies Used

| Category | Technologies & Ecosystem |
| :--- | :--- |
| **Frontend Core** | React.js (Hooks & Context API), Vite, React Router DOM v6 |
| **Styling & UI** | Tailwind CSS (JIT Engine), Lucide React, Headless UI, Framer Motion |
| **Backend Core** | Node.js (Runtime), Express.js (Restful API Design) |
| **Database & ORM** | Neon Serverless PostgreSQL, Prisma ORM (Type-safe Migrations) |
| **AI Orchestration** | OpenRouter API, Prompt Engineering, Structured JSON Parsing |
| **Security & Auth** | JSON Web Tokens (JWT), Bcrypt.js (Salt Hashing), CORS Policy |
| **FinTech (Payments)** | Stripe API, Stripe Webhooks, Asynchronous Event Handling |
| **State Management** | Redux Toolkit (Slices & Async Thunks), Persistent Storage |
| **DevOps & Cloud** | ImageKit (Cloud Media), Multer (Buffer Handling), Vercel |
| **Development Tools** | Postman (API Testing), Git/GitHub (Version Control), ESLint |

## 🚀 Getting Started

Follow these steps to set up and run the project locally on your machine.

### Prerequisites

- `Node.js` installed on your machine.
  1. Visit the official Node.js website: https://nodejs.org/en/download/ 
  2. Download and run the installer.

---

### ⚙️ 1. Server Setup (Backend)

1. Open the project folder in VS Code.

2. Open the `server` folder in your Integrated Terminal.

3. **Database Setup**: Set up a Neon Database at get.neon.com and obtain your Database URL.

4. **Install Dependencies**: Run the command `npm install`.

5. **Sync Database & Prisma**: Run the command `npx prisma migrate dev --name init`, followed by `npx prisma generate`.

6. **Environment Variables**:
   * Create a `.env` file inside the `server` folder.
   * Add your Database URL.
   * Set up an OpenRouter Key at openrouter.ai and add it to the file.
   * *(Optional for payments)* Add your Stripe Secret Key & Webhooks Secret from stripe.com. You can use a dummy link to generate the webhook secret initially, and update it later with your live Vercel endpoint.

7. **Run the Server**: Run the command `npm run server`.

---

### 💻 2. Client Setup (Frontend)

*> Note: Before running the client project, make sure your backend server is actively running*.

1. **Environment Variables**: Create a `.env` file inside the `client` folder. Add your server's live link (you can skip this if you are just running the server locally).

2. Open the `client` folder in a new Integrated Terminal.

3. **Install Dependencies**: Run the command `npm install`.

4. **Run the Client**: Run the command `npm run dev`.

## 📂 Project Structure

The repository utilizes a highly modular, scalable monorepo architecture, strictly separating the React client interface from the Express/Prisma backend logic. 

```text
AI-Website-Builder/
├── client/                         # React Frontend Application
│   ├── public/                     # Static assets (favicons, manifest)
│   ├── src/
│   │   ├── assets/                 # Images, fonts, and SVG icons
│   │   ├── components/             # Reusable modular UI components
│   │   │   ├── layout/             # Global layout (Navbar, Footer, Sidebar)
│   │   │   └── ui/                 # Micro-components (Buttons, Modals, Inputs)
│   │   ├── context/                # Global state management (Auth, Theme)
│   │   ├── hooks/                  # Custom React hooks (e.g., useAuth, useFetch)
│   │   ├── pages/                  # Route-level components
│   │   │   ├── Dashboard/          # User project management & overview
│   │   │   ├── Builder/            # Core AI generation & editing interface
│   │   │   └── Auth/               # Secure Login and Registration views
│   │   ├── services/               # API call wrappers & Axios configurations
│   │   ├── utils/                  # Helper functions, formatters, and constants
│   │   ├── App.jsx                 # Root React component & Router setup
│   │   ├── main.jsx                # React DOM entry point
│   │   └── index.css               # Global stylesheets
│   ├── .env                        # Frontend environment variables
│   ├── package.json                # Client dependencies & scripts
│   ├── tailwind.config.js          # Tailwind CSS styling configuration
│   └── vite.config.js              # Vite bundler & proxy settings
│
├── server/                         # Express Backend API
│   ├── config/                     # Service configurations
│   │   ├── cors.js                 # Cross-Origin Resource Sharing rules
│   │   └── stripe.js               # Stripe payment gateway initialization
│   ├── controllers/                # Core business logic
│   │   ├── aiController.js         # OpenRouter API orchestration & prompt handling
│   │   ├── authController.js       # User login, registration, & JWT generation
│   │   ├── projectController.js    # CRUD operations for generated websites
│   │   └── webhookController.js    # Stripe secure event listeners
│   ├── middlewares/                # Request interceptors
│   │   ├── authMiddleware.js       # Route protection & token validation
│   │   └── errorMiddleware.js      # Global error handling & formatting
│   ├── prisma/                     # Database ORM Management
│   │   ├── migrations/             # SQL migration history files
│   │   └── schema.prisma           # Relational database schema definition
│   ├── routes/                     # API endpoint definitions
│   │   ├── aiRoutes.js             # /api/ai endpoints
│   │   ├── authRoutes.js           # /api/auth endpoints
│   │   ├── projectRoutes.js        # /api/projects endpoints
│   │   └── webhookRoutes.js        # /api/webhooks endpoints
│   ├── utils/                      # Backend utilities
│   │   └── generateToken.js        # JWT signing utility
│   ├── .env                        # Server secrets (API Keys, DB URL)
│   ├── package.json                # Server dependencies & scripts
│   └── server.js                   # Express application entry point & setup
│
├── .gitignore                      # Git ignored files and directories
└── README.md                       # Main project documentation
```

## 📬 Contact

**Aditya Pandey**
- **GitHub**: [@iamAditya-Pandey](https://github.com/iamAditya-Pandey)
- **Email**: pandeyaditya19012006@gmail.com
- **LinkedIn**: [Aditya Pandey](https://www.linkedin.com/in/aditya-pandey-23309a373/)
- **Instagram**: [@aditya.pandey_19](https://www.instagram.com/aditya.pandey_19/?hl=en)

---
*Built with ❤️ by Aditya Pandey.*
