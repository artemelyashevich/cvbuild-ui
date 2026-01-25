export interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export interface AiRequestDto {
    chatId: string;
    content: string;
}