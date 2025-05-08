import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import MessageItem from '@/components/message';
import InputArea from '@/components/input-area';
import LoadingIndicator from '@/components/loading';
import { Message } from '@/types';

const ChatBox: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async (text: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            text,
            type: 'user',
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: text }),
            });

            if (!response.ok) {
                throw new Error(`Ошибка запроса: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const botMessage: Message = {
                id: Date.now().toString(),
                text: data.response,
                type: 'bot',
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            console.error('Ошибка при получении ответа:', err);
            setError(err instanceof Error ? err.message : 'Неизвестная ошибка');

            const errorMessage: Message = {
                id: Date.now().toString(),
                text: 'Произошла ошибка при получении ответа. Пожалуйста, попробуйте еще раз.',
                type: 'bot',
            };

            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full max-w-full md:max-w-3xl lg:max-w-4xl mx-auto">
            <div className={`${messages.length > 0 ? 'mb-6' : ''} w-full overflow-y-auto px-2 sm:px-4`}>
                <AnimatePresence>
                    {messages.map((message) => (
                        <MessageItem key={message.id} message={message} />
                    ))}
                </AnimatePresence>

                {isLoading && <LoadingIndicator />}

                {error && (
                    <div className="text-red-400 text-sm p-3 bg-[#1e3a70] rounded-lg mb-4 ml-2 sm:ml-11">
                        {error}
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="w-full max-w-full md:max-w-3xl lg:max-w-4xl mx-auto px-2 sm:px-0">
                <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default ChatBox;