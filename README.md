# DigitSoft AI

Alternative africaine auto-hébergée à Claude/ChatGPT.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start all apps
npm run dev
```

## 📁 Structure

```
digitsoft-ai/
├── apps/
│   ├── api/         # Backend API (Node.js + Fastify)
│   ├── mobile/      # Mobile App (React Native + Expo)
│   └── web/         # Landing Page (Next.js)
├── packages/
│   ├── shared-types/    # TypeScript shared types
│   ├── api-client/      # API client
│   └── agents-config/   # Agent configurations
└── local-ai/         # Local AI configuration
```

## 📖 Documentation

- [PRD](./PRD.md) - Product Requirements Document
- [ARCHITECTURE_DECISIONS](./ARCHITECTURE_DECISIONS.md) - Architecture decisions
- [TODO](./TODO.md) - Setup progress tracking

## 🛠️ Tech Stack

- **Mobile:** React Native + Expo
- **Backend:** Node.js + Fastify
- **LLM Engine:** Local AI
- **Agent Orchestration:** OpenClaw
- **Monorepo:** Turborepo

## 📄 License

MIT
