# Architecture Decisions - DigitSoft AI

## Decision: Monorepo (Turbo) vs Repos Séparés

**Decision:** **Monorepo avec Turbo**

---

## 📊 Comparison

| Aspect | Monorepo (Turbo) | Repos Séparés |
|--------|------------------|---------------|
| **Code sharing** | ✅ Facile, type-safe, native | ⚠️ Difficile, packages npm manuels |
| **Deployment** | ⚠️ Couplé (déployer tout) | ✅ Indépendant (déployer par app) |
| **CI/CD** | ⚠️ Plus complexe (coordonner) | ✅ Simple (par repo) |
| **Team scalability** | ⚠️ Taille peut devenir problème | ✅ Par équipe, isolation |
| **Onboarding** | ⚠️ Courbe d'apprentissage (Turbo) | ✅ Simple (stack standard) |
| **Build times** | ✅ Caching intelligent (Turbo) | ⚠️ Séparé, pas de cache partagé |
| **Type safety** | ✅ Partage TypeScript types | ❌ Pas de type safety cross-repo |
| **Release coordination** | ✅ Coordonné (changesets) | ⚠️ Difficile (versioning manuel) |
| **Tooling unifié** | ✅ ESLint, Prettier, configs partagés | ❌ Duplication possible |
| **Testing** | ✅ Cross-package testing | ⚠️ Difficile, mock nécessaire |

---

## 🎯 Why Monorepo for DigitSoft AI?

### 1. API et Mobile partagent des types

```typescript
// packages/shared-types/src/chat.ts
export interface ChatRequest {
  agent: string;
  messages: Message[];
  model: string;
}

// apps/api/src/routes/chat.ts
import { ChatRequest } from '@digitsoft-ai/shared-types';

// apps/mobile/src/services/api.ts
import { ChatRequest } from '@digitsoft-ai/shared-types';
```

Avec repos séparés, il faudrait:
- Publier un package npm `@digitsoft-ai/types`
- Gérer versioning (v1.0.0 → v1.0.1 → ...)
- Synchroniser les changements

### 2. API Client partagé

```typescript
// packages/api-client/src/index.ts
export class DigitSoftAI {
  async chat(request: ChatRequest): Promise<ChatResponse> { ... }
  async listAgents(): Promise<Agent[]> { ... }
}

// apps/mobile/src/services/api.ts (just import)
import { DigitSoftAI } from '@digitsoft-ai/api-client';
```

### 3. Agents configs partagés

```typescript
// packages/agents-config/src/agents.json
{
  "nigeria-business-expert": { ... }
}

// apps/api/src/agents/loader.ts (load config)
import agents from '@digitsoft-ai/agents-config';

// apps/mobile/src/components/AgentSelector.ts (display list)
import agents from '@digitsoft-ai/agents-config';
```

### 4. Sync des features

Quand on ajoute un nouvel agent:
- Update `packages/agents-config` → API et Mobile ont la liste automatiquement
- Update `packages/shared-types` → TypeScript errors si incompatibilité
- Pas besoin de release npm manuel

### 5. Petites équipes

Pour 1-3 devs, monorepo est plus simple:
- Un seul repo pour clone
- Pas besoin de gérer plusieurs repos
- CI/CD peut être orchestré facilement

---

## 🏗️ Monorepo Structure

```
digitsoft-ai/
├── apps/
│   ├── mobile/              # React Native (Expo)
│   │   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   └── package.json
│   ├── api/                 # API Gateway (Node.js + Fastify)
│   │   ├── src/
│   │   │   ├── routes/      # /v1/chat, /v1/agents...
│   │   │   ├── agents/      # Agent orchestration
│   │   │   ├── tools/       # Web, file, exec...
│   │   │   └── middleware/  # Auth, rate limiting
│   │   └── package.json
│   └── web/                 # Landing page web (Next.js)
│       ├── app/
│       ├── components/
│       └── package.json
├── packages/
│   ├── shared-types/        # TypeScript types partagés
│   │   ├── src/
│   │   │   ├── chat.ts      # ChatRequest, ChatResponse
│   │   │   ├── agents.ts    # Agent, AgentConfig
│   │   │   └── index.ts
│   │   └── package.json
│   ├── api-client/          # API client pour mobile
│   │   ├── src/
│   │   │   ├── DigitSoftAI.ts
│   │   │   └── index.ts
│   │   └── package.json
│   ├── agents-config/       # Définitions d'agents
│   │   ├── src/
│   │   │   ├── agents.json
│   │   │   └── index.ts
│   │   └── package.json
│   └── ui-components/       # UI components réutilisables (futur)
│       ├── src/
│       └── package.json
├── local-ai/                 # Local AI config & scripts
│   ├── models/
│   │   ├── qwen2.5-7b/
│   │   ├── sdxl/
│   │   └── whisper/
│   ├── config.yaml
│   └── docker-compose.yml
├── infra/                   # Infrastructure configs
│   ├── docker/
│   │   └── docker-compose.yml
│   └── k8s/                 # Kubernetes manifests (future)
└── docs/                    # Documentation
    ├── api/
    ├── mobile/
    └── architecture/
```

---

## 🔧 Tooling

### Turborepo
```json
{
  "tasks": {
    "dev": {
      "dependsOn": ["^build"],
      "cache": false
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    }
  },
  "pipeline": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}
```

### Workspaces (package.json)
```json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

### Dependencies
- Shared types: `@digitsoft-ai/shared-types`
- API client: `@digitsoft-ai/api-client`
- Agents config: `@digitsoft-ai/agents-config`

---

## 🚀 CI/CD Strategy

### Pipeline par workspace

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx turbo lint

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx turbo test

  build:
    runs-on: ubuntu-latest
    needs: [test]
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx turbo build
```

### Deployment

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx turbo build --filter=@digitsoft-ai/api
      - run: npm run deploy --filter=@digitsoft-ai/api

  deploy-mobile:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx turbo build --filter=@digitsoft-ai/mobile
      - run: npm run deploy:android --filter=@digitsoft-ai/mobile
```

---

## 📊 Migration Path

Si plus tard on veut passer à repos séparés:
1. Extraire chaque app en son propre repo
2. Publier packages comme npm packages
3. Gérer versioning séparément

Mais pour maintenant (1-3 devs), monorepo est optimal.

---

## 📚 References

- [Turborepo Docs](https://turbo.build/repo)
- [Nx Monorepo](https://nx.dev)
- [Lerna](https://lerna.js.org/)

---

## ✅ Conclusion

**Decision:** Monorepo avec Turbo

**Next Steps:**
1. Initialize monorepo with Turbo
2. Setup apps (mobile, api, web)
3. Setup packages (shared-types, api-client, agents-config)
4. Configure CI/CD

---

**End of Architecture Decision**
