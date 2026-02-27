/**
 * Chatbot Endpoint for DigitSoft
 * Handles messages from the embedded chat widget
 */

import { FastifyRequest, FastifyReply } from 'fastify';
import * as fs from 'fs';
import * as path from 'path';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  message: string;
  history: ChatMessage[];
}

interface ChatResponse {
  reply: string;
  actions?: Array<{
    label: string;
    type: string;
  }>;
  redirect?: {
    action: string;
  };
}

// Load knowledge base
const KNOWLEDGE_BASE_PATH = path.join(__dirname, '../../../digitsoft-chatbot/references/knowledge-base.md');

let knowledgeBase = '';

try {
  knowledgeBase = fs.readFileSync(KNOWLEDGE_BASE_PATH, 'utf-8');
  console.log('✅ Knowledge base loaded');
} catch (error) {
  console.error('❌ Failed to load knowledge base:', error);
  knowledgeBase = '';
}

// Simple response generation based on keywords
function generateResponse(message: string, history: ChatMessage[]): ChatResponse {
  const lowerMessage = message.toLowerCase();

  // Welcome/greeting
  if (lowerMessage.match(/^(bonjour|salut|hello|hi|hey|coucou)/)) {
    return {
      reply: "Bonjour ! 👋 Je suis l'assistant DigitSoft. Comment puis-je vous aider aujourd'hui ?",
      actions: [
        { label: "💼 Nos Services", type: "services" },
        { label: "💰 Tarifs", type: "pricing" },
        { label: "📞 Contact", type: "contact" }
      ]
    };
  }

  // Services inquiry
  if (lowerMessage.match(/(service|offre|solution|logiciel|développement|cybersécurité|solaire|matériel)/)) {
    return {
      reply: "DigitSoft propose plusieurs services pour accompagner votre transformation digitale :\n\n" +
        "• **Logiciel** : Développement d'applications sur mesure (Web, Mobile, Desktop)\n" +
        "• **Cybersécurité** : Audit, protection, et conseil en sécurité informatique\n" +
        "• **Solaire** : Installation et maintenance de solutions photovoltaïques\n" +
        "• **Matériel** : Fourniture d'équipements informatiques et réseaux\n\n" +
        "👉 Voulez-vous plus de détails sur un service en particulier ?",
      actions: [
        { label: "💻 Logiciel", type: "software" },
        { label: "🔐 Cybersécurité", type: "cybersecurity" },
        { label: "☀️ Solaire", type: "solar" },
        { label: "💻 Matériel", type: "hardware" }
      ]
    };
  }

  // Software specifically
  if (lowerMessage.match(/(logiciel|web|mobile|app|application|développement|site internet)/)) {
    return {
      reply: "Nos services de développement logiciel :\n\n" +
        "• **Sites Web & Applications** : Sites vitrines, e-commerce, plateformes\n" +
        "• **Applications Mobile** : iOS et Android (React Native, Flutter)\n" +
        "• **Applications Desktop** : Windows, macOS, Linux (Electron)\n" +
        "• **API & Intégrations** : Connectez vos systèmes existants\n" +
        "• **Maintenance & Support** : Mises à jour et assistance continue\n\n" +
        "Nous développons des solutions adaptées aux besoins des entreprises nigériennes et africaines.",
      actions: [
        { label: "📞 Nous Contacter", type: "contact_form" },
        { label: "💬 En savoir plus", type: "inquiry" }
      ]
    };
  }

  // Cybersecurity
  if (lowerMessage.match(/(cybersécurité|sécurité|audit|protection|hacker|malware|virus)/)) {
    return {
      reply: "Nos services de cybersécurité :\n\n" +
        "• **Audit de Sécurité** : Évaluation complète de votre infrastructure\n" +
        "• **Protection des Données** : Chiffrement, sauvegardes, contrôle d'accès\n" +
        "• **Formation** : Sensibilisation de vos équipes aux bonnes pratiques\n" +
        "• **Monitoring** : Surveillance en temps réel des menaces\n" +
        "• **Conformité** : Aide au respect des normes et régulations\n\n" +
        "La sécurité des données est cruciale, surtout pour les entreprises africaines.",
      actions: [
        { label: "📞 Demander un audit", type: "contact_form" },
        { label: "📞 En savoir plus", type: "contact" }
      ]
    };
  }

  // Solar
  if (lowerMessage.match(/(solaire|panneau|électricité|énergie|photovoltaïque)/)) {
    return {
      reply: "Nos solutions solaires pour le Niger :\n\n" +
        "• **Installation de panneaux** : Kits résidentiels et commerciaux\n" +
        "• **Batteries et onduleurs** : Stockage et conversion d'énergie\n" +
        "• **Maintenance** : Entretien et dépannage\n" +
        "• **Dimensionnement** : Étude de vos besoins énergétiques\n\n" +
        "Le soleil est une ressource abondante au Niger. Profitez-en ! ☀️",
      actions: [
        { label: "📞 Demander un devis", type: "contact_form" },
        { label: "💬 Nos kits", type: "inquiry" }
      ]
    };
  }

  // Pricing
  if (lowerMessage.match(/(prix|tarif|coût|combien|budget|payement|partenaire|mode partenaire)/)) {
    return {
      reply: "## Nos Tarifs\n\n" +
        "### Mode Standard\n" +
        "• Paiement à la tâche / au projet\n" +
        "• Devis détaillé avant engagement\n" +
        "• Idéal pour projets ponctuels\n\n" +
        "### Mode Partenaire 🤝\n" +
        "• Abonnement mensuel\n" +
        "• Accès prioritaire à nos ressources\n" +
        "• Réductions sur volume de projets\n" +
        "• Support dédié\n\n" +
        "👉 Pour un devis personnalisé, contactez-nous !",
      actions: [
        { label: "📞 Demander un devis", type: "contact_form" },
        { label: "📞 WhatsApp", type: "whatsapp" }
      ]
    };
  }

  // Contact
  if (lowerMessage.match(/(contact|téléphone|email|adresse|localisation|où|trouver|siège)/)) {
    return {
      reply: "## Coordonnées DigitSoft\n\n" +
        "📍 **Adresse** : Niamey, Niger\n" +
        "📧 **Email** : contact@digitsoftafrica.com\n" +
        "📱 **WhatsApp** : +227 XX XX XX XX\n" +
        "🌐 **Site Web** : www.digitsoftafrica.com\n\n" +
        "Nous sommes disponibles du Lundi au Vendredi, 8h-18h (UTC+1).",
      actions: [
        { label: "📞 Formulaire de contact", type: "contact_form" },
        { label: "💬 WhatsApp", type: "whatsapp" }
      ]
    };
  }

  // Partnership/B2B
  if (lowerMessage.match(/(partenariat|partenaire|collaboration|b2b|business|opportunité)/)) {
    return {
      reply: "Intéressé par un partenariat ? 🤝\n\n" +
        "Nous sommes toujours ouverts aux collaborations :\n" +
        "• **Partenariats technologiques** : Intégrateurs, hébergeurs\n" +
        "• **Agences et freelances** : White-label nos services\n" +
        "• **Investisseurs** : Discutons de notre croissance\n" +
        "• **B2B** : Solutions pour entreprises\n\n" +
        "Contactez-nous pour en discuter !",
      redirect: {
        action: "contact_form"
      }
    };
  }

  // Default response
  return {
    reply: "Je comprends votre demande. Pour mieux vous aider, pourriez-vous préciser ?\n\n" +
      "Voici ce que je peux faire :\n" +
      "• Vous informer sur nos services (Logiciel, Cybersécurité, Solaire, Matériel)\n" +
      "• Vous donner des informations sur nos tarifs\n" +
      "• Vous orienter vers le bon contact\n\n" +
      "👉 Pour une discussion détaillée, utilisez le formulaire de contact ou WhatsApp.",
    actions: [
      { label: "💼 Nos Services", type: "services" },
      { label: "💰 Tarifs", type: "pricing" },
      { label: "📞 Contact", type: "contact" }
    ]
  };
}

export default async function chatRoutes(fastify: any) {
  // POST /api/chat - Main chat endpoint
  fastify.post('/api/chat', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = request.body as ChatRequest;

      console.log('📨 Chat request received:', {
        messageLength: body.message?.length,
        historyLength: body.history?.length
      });

      // Validate request
      if (!body.message) {
        return reply.status(400).send({
          error: 'Message is required'
        });
      }

      // Generate response
      const response = generateResponse(body.message, body.history || []);

      console.log('✅ Chat response generated:', {
        replyLength: response.reply.length,
        hasActions: !!response.actions,
        hasRedirect: !!response.redirect
      });

      return reply.send(response);

    } catch (error) {
      console.error('❌ Chat endpoint error:', error);
      return reply.status(500).send({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // POST /api/chat/health - Health check
  fastify.post('/api/chat/health', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.send({
      status: 'ok',
      knowledgeBaseLoaded: knowledgeBase.length > 0,
      timestamp: new Date().toISOString()
    });
  });

  console.log('✅ Chat routes registered at /api/chat');
}
