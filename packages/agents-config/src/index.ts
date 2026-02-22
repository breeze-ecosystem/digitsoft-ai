/**
 * DigitSoft AI - Agent Configurations
 * All agents definitions for DigitSoft AI
 * Skeleton - Full agent configs will be added later
 */

import type { Agent } from '@digitsoft-ai/shared-types';

// ============================================
// Agent Registry (Skeleton - Full agents TODO)
// ============================================

const agents: Record<string, Agent> = {
  'chat-assistant': {
    id: 'chat-assistant',
    name: 'Chat Assistant',
    description: 'Assistant conversationnel général',
    category: 'core',
    capabilities: ['Rédaction', 'Traduction', 'Résumé'],
  },
  'code-assistant': {
    id: 'code-assistant',
    name: 'Code Assistant',
    description: 'Assistant pour le développement logiciel',
    category: 'core',
    capabilities: ['Debug', 'Code review', 'Refactoring'],
  },
  'nigeria-business-expert': {
    id: 'nigeria-business-expert',
    name: 'Nigeria Business Expert',
    description: 'Expert en affaires pour le Niger',
    category: 'african',
    capabilities: ['Création entreprise', 'Réglementation', 'Conseils locaux'],
  },
  // TODO: Add remaining agents
  // - creative-assistant
  // - agritech-advisor
  // - education-tutor
  // - french-writer
  // - local-life-helper
  // - research-agent
  // - automation-helper
  // - security-auditor
};

// ============================================
// Helpers
// ============================================

export function getAllAgents(): Agent[] {
  return Object.values(agents);
}

export function getAgent(id: string): Agent | undefined {
  return agents[id];
}

export function getAgentsByCategory(category: string): Agent[] {
  return getAllAgents().filter((agent) => agent.category === category);
}

// ============================================
// Export
// ============================================

export { agents };
export type { Agent };
