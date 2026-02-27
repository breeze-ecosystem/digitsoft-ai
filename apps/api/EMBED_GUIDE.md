# Guide d'intégration du Chatbot DigitSoft

## 📋 Vue d'ensemble

Le chatbot DigitSoft est composé de deux parties :
1. **Widget JavaScript** - Interface de chat à intégrer sur votre site web
2. **API Backend** - Serveur qui traite les messages et génère les réponses

## 🚀 Démarrage rapide

### 1. Démarrer le serveur API

```bash
cd /data/workspace/digitsoft-ai/apps/api

# Installer les dépendances (première fois)
npm install

# Démarrer en développement
npm run dev

# Ou compiler et démarrer en production
npm run build
npm start
```

L'API sera disponible sur : `http://localhost:3000`

### 2. Générer le widget

```bash
cd /data/workspace
python3 digitsoft-chatbot/scripts/widget-generator.py --output /tmp/digitsoft-widget.js
```

### 3. Configurer le widget

Ouvrez le fichier widget généré et modifiez la configuration :

```javascript
const config = {
    "bot_name": "DigitSoft Assistant",
    "welcome_message": "Bonjour ! Comment puis-je vous aider ?",
    "primary_color": "#2563eb",
    "position": "bottom-right",

    // ⚠️ IMPORTANT : URL complète de votre API
    "api_endpoint": "http://localhost:3000/api/chat",

    "enable_whatsapp_redirect": true,
    "whatsapp_number": "+227 90 22 83 13",
    "enable_contact_form": true,
    "contact_form_url": "/contact"
};
```

### 4. Intégrer sur votre site web

Ajoutez le widget juste avant la balise `</body>` :

```html
<!DOCTYPE html>
<html>
<head>
    <title>Votre Site</title>
</head>
<body>
    <!-- Votre contenu... -->

    <!-- Chatbot Widget -->
    <script src="/path/to/digitsoft-widget.js"></script>
</body>
</html>
```

## 🔧 Configuration avancée

### Variables de configuration

| Variable | Type | Description | Valeur par défaut |
|----------|-------|-------------|------------------|
| `bot_name` | string | Nom affiché dans le widget | "DigitSoft Assistant" |
| `welcome_message` | string | Message de bienvenue | "Hello! I'm your DigitSoft assistant..." |
| `primary_color` | hex | Couleur principale du widget | "#2563eb" |
| `position` | string | Position du bouton | "bottom-right" |
| `api_endpoint` | string | **URL de l'API backend** | "/api/chat" |
| `enable_whatsapp_redirect` | boolean | Activer redirection WhatsApp | true |
| `whatsapp_number` | string | Numéro WhatsApp | "" |
| `enable_contact_form` | boolean | Activer formulaire contact | true |
| `contact_form_url` | string | URL du formulaire | "/contact" |

### API Endpoint Options

Le widget peut être configuré avec différents endpoints :

#### Option 1 : API locale (développement)
```javascript
"api_endpoint": "http://localhost:3000/api/chat"
```

#### Option 2 : API de production
```javascript
"api_endpoint": "https://api.digitsoftafrica.com/api/chat"
```

#### Option 3 : Proxy via votre propre serveur
```javascript
"api_endpoint": "/api/proxy/chat" // Sur votre propre serveur
```

## 🔌 CORS Configuration

L'API DigitSoft est configurée pour accepter les requêtes CORS depuis n'importe quelle origine en développement. Pour la production :

### Sur l'API Fastify

L'API inclut déjà `@fastify/cors` avec :
```typescript
fastify.register(cors, {
  origin: true, // Accepte toutes les origines
  credentials: true,
});
```

Pour restreindre en production :
```typescript
fastify.register(cors, {
  origin: ['https://digitsoftafrica.com', 'https://www.digitsoftafrica.com'],
  credentials: true,
});
```

## 📨 Format des requêtes API

### POST /api/chat

**Corps de la requête :**
```json
{
  "message": "Message de l'utilisateur",
  "history": [
    {
      "role": "user",
      "content": "Message précédent"
    },
    {
      "role": "assistant",
      "content": "Réponse précédente"
    }
  ]
}
```

**Réponse :**
```json
{
  "reply": "Réponse du chatbot",
  "actions": [
    {
      "label": "💼 Nos Services",
      "type": "services"
    },
    {
      "label": "📞 Contact",
      "type": "contact"
    }
  ],
  "redirect": {
    "action": "contact_form"
  }
}
```

## 🐛 Dépannage

### Widget ne charge pas

**Symptôme :** Le bouton de chat n'apparaît pas.

**Solutions :**
1. Vérifiez que le fichier widget est bien inclus dans le HTML
2. Vérifiez qu'il n'y a pas d'erreurs JavaScript dans la console du navigateur
3. Vérifiez que le chemin du fichier est correct

### Messages ne s'envoient pas (Erreur CORS)

**Symptôme :** Erreur CORS ou "Network Error" dans la console.

**Solutions :**
1. Vérifiez que l'URL de l'API est complète (http://..., pas juste /api/chat)
2. Vérifiez que le serveur API est bien démarré
3. Vérifiez que CORS est activé sur le serveur API

### Pas de réponse du chatbot

**Symptôme :** Le message s'envoie mais pas de réponse.

**Solutions :**
1. Vérifiez les logs du serveur API (`npm run dev` pour voir les logs)
2. Testez l'endpoint API directement : `curl -X POST http://localhost:3000/api/chat -H "Content-Type: application/json" -d '{"message":"test","history":[]}'`
3. Vérifiez que la base de connaissance est chargée

## 📊 Monitoring & Logs

### Logs du serveur API

```bash
# Les logs sont affichés dans le terminal
npm run dev

# Messages attendus :
# 🚀 DigitSoft AI API running on http://localhost:3000
# 📨 Chat endpoint available at http://localhost:3000/api/chat
# 📨 Chat request received: { messageLength: 10, historyLength: 0 }
# ✅ Chat response generated: { replyLength: 50, hasActions: true, hasRedirect: false }
```

### Logs du navigateur

Ouvrez la console du navigateur (F12) pour voir :
- Requêtes réseau
- Erreurs JavaScript
- Reponses de l'API

## 🚀 Prochaines étapes

Pour améliorer le chatbot :

1. **Implémenter l'authentification API** pour sécuriser l'endpoint
2. **Ajouter la persistance de conversation** (localStorage + backend)
3. **Intégrer un vrai LLM** (GLM, Claude API, etc.) au lieu des réponses par mots-clés
4. **Ajouter l'analytique** pour tracker les métriques de conversation
5. **Créer une interface admin** pour gérer la base de connaissance

## 📞 Support

Pour toute question ou problème :
- Email : contact@digitsoftafrica.com
- WhatsApp : +227 90 22 83 13
- Site web : www.digitsoftafrica.com
