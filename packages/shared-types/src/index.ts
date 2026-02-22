/**
 * DigitSoft AI - Shared TypeScript Types
 * Used across API, Mobile, and Web apps
 */

// ============================================
// Chat Types
// ============================================

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export interface ChatRequest {
  agent: string;
  messages: Message[];
  model?: string;
  tools?: string[];
  sessionId?: string;
}

export interface ChatResponse {
  id: string;
  agent: string;
  message: Message;
  sessionId: string;
  timestamp: string;
}

// ============================================
// Agent Types
// ============================================

export interface Agent {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'african' | 'advanced';
  capabilities: string[];
  model?: string;
  tools?: string[];
}

// ============================================
// Session Types
// ============================================

export interface Session {
  id: string;
  userId?: string;
  agent: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Image Generation Types
// ============================================

export interface ImageGenerateRequest {
  prompt: string;
  model?: string;
  width?: number;
  height?: number;
}

export interface ImageGenerateResponse {
  imageId: string;
  url: string;
  model: string;
  prompt: string;
}

// ============================================
// Speech Transcription Types
// ============================================

export interface SpeechTranscribeRequest {
  audio: string;
  language?: string;
  model?: string;
}

export interface SpeechTranscribeResponse {
  transcriptionId: string;
  text: string;
  language: string;
  duration: number;
}

// ============================================
// Export all
// ============================================
export * from './chat';
export * from './agents';
export * from './sessions';
export * from './image';
export * from './speech';
