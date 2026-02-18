export interface AiRequestDto {
    chatId: string;
    content: string;
}
export interface IChat {
    id: string;
    userId: string;
    messages: Message[];
    templateId?: string;
    updatedAt: string;
    finished: boolean;
}
export interface Message {
    role: 'user' | 'assistant';
    content: string;
}