# 🚀 AI Website Builder

AI Website Builder SaaS Platform is an enterprise-grade, full-stack monorepo engineered to automate the transition from conceptualization to deployment. This platform orchestrates an advanced MERN-architecture backend with Prisma ORM and Neon serverless PostgreSQL, integrating OpenRouter’s LLM API to deliver a high-performance, AI-driven website generation engine. Built with a focus on scalability and security, it features robust JWT-based authentication, asynchronous Stripe webhook handling, and a modular frontend designed for seamless user experience and rapid iteration.

## ✨ Features

* **AI-Powered Generation Engine:** Integrates OpenRouter API to programmatically generate and edit dynamic website layouts, demonstrating advanced API orchestration and prompt handling.

* **Robust Security & Authentication:** Implements secure user authentication with protected API routes, session management, and encrypted data transmission to ensure user privacy and system integrity.

* **Scalable Serverless Database:** Utilizes a Neon serverless PostgreSQL database managed via Prisma ORM, showcasing proficiency in relational database design, migrations, and type-safe data queries.

* **Secure Payment & Webhooks:** Features enterprise-grade Stripe integration for subscription handling, including secure backend webhook listeners to process real-time financial events.

* **Clean Monorepo Architecture:** Maintains a strict separation of concerns with a modular React frontend (`client`) and Express.js backend (`server`), utilizing clean code principles for high maintainability.

* **Responsive & Optimized UI:** Designed with a mobile-first approach, ensuring seamless cross-device compatibility, high accessibility, and a polished, professional user experience.

## 🛠️ Technologies Used

| Category | Technologies |
| :--- | :--- |
| **Frontend (Client)** | React |
| **Backend (Server)** | Node.js, Express.js |
| **Database & ORM** | Neon (PostgreSQL), Prisma |
| **AI Integration** | OpenRouter API |
| **Payments (Optional)**| Stripe |

## 🚀 Getting Started

[cite_start]Follow these steps to set up and run the project locally on your machine[cite: 1, 8].

### Prerequisites

- `Node.js` installed on your machine.
  1. [cite_start]Visit the official Node.js website: https://nodejs.org/en/download/ [cite: 5]
  2. [cite_start]Download and run the installer[cite: 6, 7].

---

### ⚙️ 1. Server Setup (Backend)

1. [cite_start]Open the project folder in VS Code[cite: 10].

2. [cite_start]Open the `server` folder in your Integrated Terminal[cite: 24].

3. [cite_start]**Database Setup**: Set up a Neon Database at get.neon.com and obtain your Database URL[cite: 11, 12].

4. [cite_start]**Install Dependencies**: Run the command `npm install`[cite: 14].

5. [cite_start]**Sync Database & Prisma**: Run the command `npx prisma migrate dev --name init`, followed by `npx prisma generate`[cite: 13, 15, 16].

6. **Environment Variables**:
   * Create a `.env` file inside the `server` folder.
   * Add your Database URL.
   * [cite_start]Set up an OpenRouter Key at openrouter.ai and add it to the file[cite: 17, 18].
   * [cite_start]*(Optional for payments)* Add your Stripe Secret Key & Webhooks Secret from stripe.com[cite: 19, 20]. [cite_start]You can use a dummy link to generate the webhook secret initially, and update it later with your live Vercel endpoint[cite: 21, 23].

7. [cite_start]**Run the Server**: Run the command `npm run server`[cite: 25, 26].

---

### 💻 2. Client Setup (Frontend)

[cite_start]*> Note: Before running the client project, make sure your backend server is actively running*[cite: 27].

1. **Environment Variables**: Create a `.env` file inside the `client` folder. [cite_start]Add your server's live link (you can skip this if you are just running the server locally)[cite: 29].

2. [cite_start]Open the `client` folder in a new Integrated Terminal[cite: 30].

3. [cite_start]**Install Dependencies**: Run the command `npm install`[cite: 31, 32].

4. [cite_start]**Run the Client**: Run the command `npm run dev`[cite: 33, 34].

## 📂 Project Structure

The repository is structured into two main directories to separate the frontend client from the backend server logic.

```text
AI-Website-Builder/
├── client/                     # Frontend Application
│   ├── src/                    # React components, pages, and assets
│   ├── package.json            # Client dependencies
│   └── .env                    # Client environment variables (Ignored)
│
└── server/                     # Backend API Application
    ├── controllers/            # API logic
    ├── middlewares/            # Custom middleware
    ├── routes/                 # API endpoint definitions 
    ├── prisma/                 # Prisma schema
    ├── package.json            # Server dependencies
    └── .env                    # Server environment variables (Ignored)
```

## 📬 Contact

**Aditya Pandey**
- **GitHub**: [@iamAditya-Pandey](https://github.com/iamAditya-Pandey)
- **Email**: pandeyaditya19012006@gmail.com
- **LinkedIn**: [Aditya Pandey](https://www.linkedin.com/in/aditya-pandey-23309a373/)
- **Instagram**: [@aditya.pandey_19](https://www.instagram.com/aditya.pandey_19/?hl=en)

---
*Built with ❤️ by Aditya Pandey.*
