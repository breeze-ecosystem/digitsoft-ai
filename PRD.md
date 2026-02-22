# PRD - DigitSoft AI

**Version:** 1.0
**Date:** 2026-02-22
**Author:** Kael (mnkjr25)
**Status:** Draft

---

## 📋 Executive Summary

DigitSoft AI est une alternative africaine auto-hébergée à Claude, ChatGPT, Gemini et Z.ai. Notre valeur ajoutée :

1. **Contexte africain** : Agents spécialisés pour le Niger et l'Afrique
2. **Auto-hébergé** : Privacy totale, contrôle des données
3. **Mobile-first** : Priorité aux utilisateurs mobiles africains
4. **Prix compétitif** : $15/mois vs $20+/mois pour la concurrence
5. **API access** : Pour les développeurs qui veulent intégrer nos agents

---

## 🎯 Product Vision

> Un assistant AI agentic, accessible, adapté à l'Afrique, qui résout des problèmes réels pour les utilisateurs nigériens et africains.

---

## 👥 Target Users

### Primary
- **Étudiants** : Tutoring, aide aux devoirs, recherche
- **Freelancers** : Rédaction, brainstorming, tâches créatives
- **Petites entreprises** : Affaires, réglementation, conseils locaux
- **Développeurs** : Code assistance, debugging, best practices

### Secondary
- **Agriculteurs** : Conseils cultures, météo, prix marché
- **Professionnels santé** : Éducation santé, triage basique (pas diagnostic)
- **Créateurs de contenu** : Posts sociaux, blogs, marketing

---

## 🎨 Core Features

### Core Chatbot Features (Mobile)
- [x] Chat UI moderne avec messages bubbles
- [x] Agent switch (dropdown pour changer d'agent en live)
- [x] Multi-modal input (texte, image, voice)
- [x] Markdown rendering + code blocks avec syntax highlighting
- [x] Dark mode
- [x] Chat history (local + sync cloud)
- [x] Offline mode (si local)

### Agentic Features
- [x] Tool calling (web search, file operations, browser)
- [x] Multi-step tasks (ex: "Crée un plan d'affaires pour une startup Niger")
- [x] Party mode (multi-agents collaborent dans une conversation)
- [x] Memory (rappelle des conversations passées et préférences utilisateur)
- [x] Context-aware responses (adapté aux réalités nigériennes)

### API Features (Pour Devs)
- [x] REST API `/v1/chat/completions`
- [x] Agent endpoints (`/v1/agents/list`, `/v1/agents/{id}/chat`)
- [x] Multi-modal endpoints (`/v1/image/generate`, `/v1/speech/transcribe`)
- [x] Session management (`/v1/sessions/create`, `/v1/sessions/{id}`)
- [x] Auth (API Keys + JWT)
- [x] Rate limiting (Redis)
- [x] SDK (Node.js, Python)

### Mobile Specific Features
- [x] Voice input (Whisper local)
- [x] Image generation (SDXL local)
- [x] Push notifications (réponses longues asynchrones)
- [x] Share content (messages vers autres apps)
- [x] Keyboard shortcuts/power user features

---

## 🤖 Agents Spécialisés

### Core Agents (Disponibles à tous)

| Agent ID | Name | Role | Capabilities |
|----------|------|------|---------------|
| `chat-assistant` | Chat Assistant | Conversation générale | Rédaction, traduction, résumé, idées |
| `code-assistant` | Code Assistant | Développement logiciel | Debug, review, refactoring, best practices |
| `creative-assistant` | Creative Assistant | Contenu créatif | Posts sociaux, blogs, brainstorming |

### African Agents (Différenciation - Pro & Enterprise)

| Agent ID | Name | Role | Capabilities |
|----------|------|------|---------------|
| `nigeria-business-expert` | Nigeria Business Expert | Affaires Niger | Réglementation, création entreprise, conseils locaux |
| `agritech-advisor` | Agritech Advisor | Agriculture | Conseils cultures, météo, prix marché Niger |
| `education-tutor` | Education Tutor | Tutoring | Programmes nigériens, aide aux devoirs |
| `french-writer` | French Writer | Contenu FR | Optimisé AF, ton africain, context local |
| `local-life-helper` | Local Life Helper | Vie quotidienne Niger | Services, transport, vie pratique Niger |

### Advanced Agents (Enterprise)

| Agent ID | Name | Role | Capabilities |
|----------|------|------|---------------|
| `research-agent` | Research Agent | Recherche approfondie | Web search + synthèse |
| `automation-helper` | Automation Helper | Automatisation | n8n workflows, scripts, tâches répétitives |
| `security-auditor` | Security Auditor | Audits sécurité | Code security, best practices OWASP |

---

## 🦙 Models & Technology Stack

### Models (MVP - 8GB RAM)

| Type | Model | RAM | Quantization | Use |
|------|-------|-----|---------------|-----|
| **Text** | Qwen 2.5 7B Instruct | ~4-5GB | Q4_K_M | Chat, agents |
| **Image** | SDXL Turbo | ~4GB | - | Génération images rapide |
| **Voice** | Whisper Base | ~1GB | - | Transcription |

### Models (Production - Future)

| Type | Model | RAM | Use |
|------|-------|-----|-----|
| **Text** | Kimi K2.5 16B ou MiniMax M2 16B | ~12-16GB | Performance supérieure |
| **Image** | SD 3.0 ou Flux | ~8-12GB | Meilleure qualité |
| **Voice** | Whisper Large | ~2GB | Meilleure transcription |

### Technology Stack

| Couche | Tech | Pourquoi |
|--------|------|----------|
| **Mobile** | React Native + Expo | Cross-platform iOS/Android, rapidité dev |
| **UI** | React Native Paper | Material Design, native feel |
| **Backend API** | Node.js + Fastify | Rapide, types natifs, async/await |
| **LLM Engine** | Local AI | Multi-modal unifié (texte, image, audio) |
| **Agent Orchestration** | OpenClaw | Agents, skills, workflows |
| **Auth** | JWT + PostgreSQL | Simple, fiable, scalable |
| **Cache** | Redis | Rate limiting, session store |
| **Database** | PostgreSQL | Users, sessions, logs |
| **Monitoring** | Prometheus + Grafana | Métriques, alertes |
| **Infrastructure** | Docker + VPS | Auto-hébergé, contrôlable |

---

## 💰 Monetization

### Pricing Tiers

| Tier | Price | Requests | Agents | Features | Support |
|------|-------|----------|--------|----------|---------|
| **Free** | $0/mois | 50/jour | Core only | Chat basique, pas d'images, pas de voice | Community |
| **Pro** | $15/mois | Unlimited | Tous (incl. African) | Multi-modal, Party mode, API access | Priority email |
| **Enterprise** | $50+/mois | Unlimited | Tous + Custom agents | Multi-modal, Party mode, API access, SLA, Custom agents | Dedicated |

### API-Only Pricing (Pour devs)

| Tier | Price | Requests | Rate Limit |
|------|-------|----------|------------|
| **Starter** | $10/mois | 10K/mois | 10 req/min |
| **Pro** | $50/mois | 100K/mois | 100 req/min |
| **Enterprise** | Custom | Unlimited | Custom |

---

## 🚀 Phases & Roadmap

### Phase 1: Foundation (Semaines 1-2)
**Goal:** Infrastructure base + API minimal

- [ ] Setup repo structure (monorepo)
- [ ] API Node.js + Fastify setup
- [ ] Auth (JWT + API keys)
- [ ] Rate limiting (Redis)
- [ ] Endpoint `/v1/chat/completions` basique
- [ ] Local AI setup + Qwen 2.5 7B
- [ ] Postgres setup (users, API keys, sessions)

### Phase 2: Models & Agents (Semaines 3-4)
**Goal:** Multi-modal + agents spécialisés

- [ ] Configurer Local AI models (Qwen 2.5, SDXL, Whisper)
- [ ] Créer 3 core agents (chat, code, creative)
- [ ] Créer 2 African agents (nigeria-business, french-writer)
- [ ] Implementer tool calling (web, file, exec)
- [ ] Session management + memory
- [ ] Multi-agent orchestration (Party mode)

### Phase 3: Mobile Chat UI (Semaines 5-7)
**Goal:** Chatbot mobile moderne

- [ ] Expo setup + React Native
- [ ] Chat UI (messages bubbles, input)
- [ ] Agent selector
- [ ] Voice input (Whisper integration)
- [ ] Image input + generation
- [ ] Markdown + code blocks
- [ ] Chat history (local + sync)
- [ ] Dark mode
- [ ] Navigation (Chat, History, Settings)

### Phase 4: Polish & Launch (Semaines 8-10)
**Goal:** MVP prêt pour launch

- [ ] Tests E2E
- [ ] Documentation API
- [ ] Landing page web
- [ ] Store submission (Google Play, App Store)
- [ ] Deploy MVP (VPS)
- [ ] Monitoring + alerting
- [ ] User feedback collection

### Phase 5: Growth (Mois 3+)
**Goal:** Features avancées + scale

- [ ] Offline mode (local)
- [ ] Custom agents (Enterprise)
- [ ] Web admin dashboard
- [ ] Analytics & insights
- [ ] Referral program
- [ ] Community features

---

## 🎯 Success Metrics (KPIs)

### User Engagement
- DAU (Daily Active Users)
- MAU (Monthly Active Users)
- Avg messages per user/day
- Retention rate (Day 1, 7, 30)

### Technical Performance
- API response time P50/P95/P99
- Model inference time per request
- Uptime (SLA: 99.5%+)
- Error rate (< 0.1%)

### Business
- Conversion rate (Free → Pro)
- MRR (Monthly Recurring Revenue)
- CAC (Customer Acquisition Cost)
- LTV (Lifetime Value)
- Churn rate

### Quality
- User satisfaction (NPS)
- Agent accuracy (user ratings)
- Response quality (manual reviews)

---

## 🔒 Security & Privacy

### Authentication & Authorization
- JWT tokens avec expiration courte (15min access, 7d refresh)
- API keys rotatives
- Rate limiting strict par utilisateur/IP
- Tenant isolation (pas de data leakage entre clients)

### Data Protection
- Tous les logs anonymisés
- Session data encrypted at rest
- User consent explicite
- GDPR compliant (si clients EU)

### Infrastructure Security
- VPN pour accès admin
- MFA pour tous les accès sensibles
- Firewalls stricts (whitelist only)
- Regular security audits (monthly)

---

## 🏗️ Architecture Decisions

### Monorepo vs Repos Séparés

| Aspect | Monorepo (Turbo) | Repos Séparés |
|--------|------------------|---------------|
| **Code sharing** | ✅ Facile, type-safe | ⚠️ Difficile |
| **Deployment** | ⚠️ Couplé (déployer tout) | ✅ Indépendant |
| **CI/CD** | ⚠️ Plus complexe | ✅ Simple |
| **Team scalability** | ⚠️ Taille peut devenir un problème | ✅ Par équipe |
| **Onboarding** | ⚠️ Courbe d'apprentissage | ✅ Simple |
| **Build times** | ✅ Caching turbo | ⚠️ Séparé |

**Recommandation:** Monorepo avec Turbo

**Pourquoi:**
- API et Mobile partagent des types (API client schemas)
- Facile de synchroniser les features
- Tooling unifié (linting, formatting)
- Moins de duplication (shared configs, utilities)
- Pour une petite équipe (1-3 devs), monorepo est plus simple à gérer

**Structure monorepo:**
```
digitsoft-ai/
├── apps/
│   ├── mobile/              # React Native (Expo)
│   ├── api/                 # API Gateway (Node.js)
│   └── web/                 # Landing page web
├── packages/
│   ├── shared-types/        # TypeScript types partagés
│   ├── api-client/          # API client pour mobile
│   ├── agents-config/       # Définitions d'agents
│   └── ui-components/       # Components réutilisables (futur)
├── local-ai/                 # Local AI config & scripts
└── docs/                    # Documentation
```

---

## 📦 API Specification (High-Level)

### Endpoints Principaux

```
POST   /v1/chat/completions     # Chat avec un agent
GET    /v1/agents               # Liste des agents
POST   /v1/sessions/create      # Créer une session
GET    /v1/sessions/{id}        # Récupérer une session
POST   /v1/image/generate       # Générer une image
POST   /v1/speech/transcribe    # Transcrire audio (Whisper)
```

### Request/Response Exemple

```typescript
// POST /v1/chat/completions
{
  "agent": "nigeria-business-expert",
  "messages": [
    { "role": "user", "content": "Comment créer une LLC au Niger ?" }
  ],
  "model": "qwen2.5-7b",
  "tools": ["web_search", "file_read"],
  "sessionId": "uuid"
}

// Response
{
  "id": "msg_uuid",
  "agent": "nigeria-business-expert",
  "message": {
    "role": "assistant",
    "content": "Pour créer une LLC au Niger...",
    "toolsUsed": ["web_search"]
  },
  "sessionId": "uuid",
  "timestamp": "2026-02-22T20:00:00Z"
}
```

---

## 🌍 Competitive Analysis

| Feature | DigitSoft AI | Claude | ChatGPT | Gemini | Z.ai |
|---------|--------------|--------|---------|--------|------|
| **Contexte africain** | ✅ | ❌ | ❌ | ⚠️ | ❌ |
| **Auto-hébergé** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Mobile-first** | ✅ | ⚠️ | ⚠️ | ⚠️ | ❌ |
| **Multi-modal** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Prix** | $15/mois | $20/mois | $20/mois | $20/mois | ? |
| **API access** | ✅ (Pro) | ✅ (Payant) | ✅ (Payant) | ✅ (Payant) | ? |
| **Offline mode** | ✅ (Roadmap) | ❌ | ❌ | ❌ | ❌ |
| **Local storage** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Privacy** | ✅ (Self-hosted) | ⚠️ | ⚠️ | ⚠️ | ? |

**Différenciation clés:**
1. African expertise (agents spécialisés)
2. Self-hosted (privacy, contrôle)
3. Mobile-first (UX optimisée mobile)
4. Price competitive
5. API access included in Pro tier

---

## 🎯 Risk Mitigation

### Technical Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Modèle pas assez performant | High | Medium | Test multiples modèles, user feedback, upgrade rapide |
| Infrastructure scaling | High | Medium | Monitoring, auto-scaling, cloud backup |
| Sécurité breaches | Critical | Low | Audits réguliers, MFA, encryption |

### Business Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Adoption faible | High | Medium | Marketing ciblé Nigeria, pricing agressif |
| Concurrence forte | Medium | High | Différenciation (african expertise) |
| Burn rate trop élevé | High | Medium | MVP lean, auto-hébergé, cloud only si nécessaire |

### Market Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Réseau mobile limité | High | Medium (Niger) | Offline mode, optimisation data usage |
| Paiement difficile | Medium | Medium (Niger) | Mobile money (Orange Money, MTN) + Stripe |

---

## 📅 Timeline Summary

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Phase 1 | 2 weeks | API base, Auth, Rate limiting |
| Phase 2 | 2 weeks | Models, Agents, Tools |
| Phase 3 | 3 weeks | Mobile Chat UI |
| Phase 4 | 3 weeks | Polish, Tests, Launch |
| **Total MVP** | **10 weeks** | **Launch-ready MVP** |

---

## 🎉 Success Criteria

### MVP Launch (10 semaines)
- [ ] API stable avec 3 core agents + 2 African agents
- [ ] Mobile app fonctionnelle (Android + iOS)
- [ ] 50 beta users avec feedback positif
- [ ] Uptime 99%+ pendant beta
- [ ] Conversion Free → Pro de 5%+

### 6 Months Post-Launch
- [ ] 1,000 MAU
- [ ] $5K MRR
- [ ] 100+ API customers
- [ ] NPS > 50
- [ ] Store rating > 4.5 stars

---

## 📚 Next Steps

1. **Repo Setup:** Initialiser monorepo Turbo avec structure définie
2. **Design:** Wireframes de l'UI mobile (Figma)
3. **Tech Validation:** Test Local AI + Qwen 2.5 7B sur 8GB RAM
4. **Brand:** Logo, colors, voice de l'assistant
5. **Legal:** Terms of service, privacy policy

---

**End of PRD**
