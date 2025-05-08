import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { ApiRequest, ApiResponse } from '../types';

export class GeminiAPI {
    private model: GenerativeModel;
    private static instance: GeminiAPI;

    private constructor(apiKey: string) {
        const genAI = new GoogleGenerativeAI(apiKey);
        this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }

    public static getInstance(apiKey: string): GeminiAPI {
        if (!GeminiAPI.instance) {
            GeminiAPI.instance = new GeminiAPI(apiKey);
        }
        return GeminiAPI.instance;
    }

    public async generateResponse(message: string): Promise<string> {
        try {
            const result = await this.model.generateContent(message);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Error generating response:', error);
            throw new Error('Не удалось получить ответ от Gemini API');
        }
    }
}

export async function processApiRequest(request: ApiRequest): Promise<ApiResponse> {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error('API ключ Gemini не настроен');
        }

        const geminiApi = GeminiAPI.getInstance(apiKey);
        const responseText = await geminiApi.generateResponse(request.message);

        return { response: responseText };
    } catch (error) {
        console.error('Error processing API request:', error);
        return {
            response: 'Произошла ошибка при обработке запроса',
            error: error instanceof Error ? error.message : 'Неизвестная ошибка'
        };
    }
}