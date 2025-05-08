// app/types/index.ts

// Тип сообщения
export type MessageType = 'user' | 'bot';

// Интерфейс сообщения
export interface Message {
  id: string;
  text: string;
  type: MessageType;
}

// Интерфейс для состояния чата
export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

// Интерфейс для ответа API
export interface ApiResponse {
  response: string;
  error?: string;
}

// Интерфейс для запроса к API
export interface ApiRequest {
  message: string;
}

// Интерфейс для хука распознавания речи
export interface VoiceRecognitionHook {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  error: string | null;
}