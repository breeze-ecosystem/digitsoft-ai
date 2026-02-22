/**
 * DigitSoft AI - API Client
 * TypeScript client for DigitSoft AI API
 */

import type {
  ChatRequest,
  ChatResponse,
  Agent,
  Session,
  ImageGenerateRequest,
  ImageGenerateResponse,
  SpeechTranscribeRequest,
  SpeechTranscribeResponse,
} from '@digitsoft-ai/shared-types';

// ============================================
// Config
// ============================================

export interface DigitSoftAIConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

// ============================================
// API Client Class
// ============================================

export class DigitSoftAI {
  private config: DigitSoftAIConfig;

  constructor(config: DigitSoftAIConfig) {
    this.config = {
      baseUrl: 'http://localhost:3000',
      timeout: 30000,
      ...config,
    };
  }

  // ============================================
  // Chat Methods (Skeleton - Implementation TODO)
  // ============================================

  /**
   * Send a chat request to an agent
   * TODO: Implement with fetch/axios
   */
  async chat(request: ChatRequest): Promise<ChatResponse> {
    // Placeholder - will be implemented later
    throw new Error('Not implemented yet');
  }

  /**
   * Stream a chat response
   * TODO: Implement streaming
   */
  async chatStream(request: ChatRequest): Promise<AsyncIterable<ChatResponse>> {
    // Placeholder - will be implemented later
    throw new Error('Not implemented yet');
  }

  // ============================================
  // Agents Methods (Skeleton - Implementation TODO)
  // ============================================

  /**
   * List all available agents
   * TODO: Implement with fetch/axios
   */
  async listAgents(): Promise<Agent[]> {
    // Placeholder - will be implemented later
    throw new Error('Not implemented yet');
  }

  /**
   * Get a specific agent by ID
   * TODO: Implement with fetch/axios
   */
  async getAgent(id: string): Promise<Agent> {
    // Placeholder - will be implemented later
    throw new Error('Not implemented yet');
  }

  // ============================================
  // Session Methods (Skeleton - Implementation TODO)
  // ============================================

  /**
   * Create a new session
   * TODO: Implement with fetch/axios
   */
  async createSession(): Promise<Session> {
    // Placeholder - will be implemented later
    throw new Error('Not implemented yet');
  }

  // ============================================
  // Image Generation Methods (Skeleton - Implementation TODO)
  // ============================================

  /**
   * Generate an image
   * TODO: Implement with fetch/axios
   */
  async generateImage(request: ImageGenerateRequest): Promise<ImageGenerateResponse> {
    // Placeholder - will be implemented later
    throw new Error('Not implemented yet');
  }

  // ============================================
  // Speech Transcription Methods (Skeleton - Implementation TODO)
  // ============================================

  /**
   * Transcribe audio to text
   * TODO: Implement with fetch/axios
   */
  async transcribeSpeech(request: SpeechTranscribeRequest): Promise<SpeechTranscribeResponse> {
    // Placeholder - will be implemented later
    throw new Error('Not implemented yet');
  }
}

// ============================================
// Factory Function
// ============================================

export function createClient(config: DigitSoftAIConfig): DigitSoftAI {
  return new DigitSoftAI(config);
}

// ============================================
// Default Export
// ============================================

export default DigitSoftAI;
