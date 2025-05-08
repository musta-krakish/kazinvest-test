import { NextRequest, NextResponse } from 'next/server';
import { processApiRequest } from '@/lib/gemini';
import { ApiRequest } from '@/types';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { message } = data as ApiRequest;

        if (!message || typeof message !== 'string' || message.trim() === '') {
            return NextResponse.json(
                { error: 'Сообщение не может быть пустым' },
                { status: 400 }
            );
        }

        const response = await processApiRequest({ message });

        if (response.error) {
            return NextResponse.json(
                { error: response.error },
                { status: 500 }
            );
        }

        return NextResponse.json({ response: response.response });
    } catch (error) {
        console.error('Ошибка при обработке запроса:', error);
        return NextResponse.json(
            { error: 'Произошла ошибка при обработке запроса' },
            { status: 500 }
        );
    }
}