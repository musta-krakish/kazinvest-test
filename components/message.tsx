import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '../types';
import { User, Bot } from 'lucide-react';

interface MessageItemProps {
    message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`flex mb-4 sm:mb-6 ${message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
        >
            {message.type === 'bot' && (
                <div className="bg-[#1e3a70] w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-1 flex-shrink-0">
                    <Bot size={14} className="sm:hidden" />
                    <Bot size={16} className="hidden sm:block" />
                </div>
            )}

            <div className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-xl sm:rounded-2xl ${message.type === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-[#1e3a70] text-white'
                }`}>
                <div className="whitespace-pre-wrap break-words text-sm sm:text-base">
                    {message.text}
                </div>
            </div>

            {message.type === 'user' && (
                <div className="bg-[#1e3a70] w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ml-2 sm:ml-3 mt-1 flex-shrink-0">
                    <User size={14} className="sm:hidden" />
                    <User size={16} className="hidden sm:block" />
                </div>
            )}
        </motion.div>
    );
};

export default MessageItem;
