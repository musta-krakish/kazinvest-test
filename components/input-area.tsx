import React, { useState, useEffect } from 'react';
import { Send, Mic, MicOff, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import useVoiceRecognition from '../hooks/useVoiceRecognition';

interface InputAreaProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
    const [inputText, setInputText] = useState('');
    const { isListening, transcript, startListening, stopListening, error } = useVoiceRecognition();


    useEffect(() => {
        if (transcript) {
            setInputText(transcript);
        }
    }, [transcript]);


    useEffect(() => {
        if (error) {
            console.error('Voice recognition error:', error);
        }
    }, [error]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputText.trim() || isLoading) return;

        onSendMessage(inputText);
        setInputText('');
    };

    const handleVoiceButtonClick = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 md:mt-12 lg:mt-16 w-full max-w-full px-4 sm:px-6 md:px-8">
            <div className="relative flex items-center w-full max-w-3xl mx-auto">
                <button
                    type="button"
                    onClick={handleVoiceButtonClick}
                    className={`absolute left-2 sm:left-4 z-10 ${isListening ? 'text-red-500' : 'text-blue-400'
                        }`}
                >
                    {isListening ? <MicOff size={18} className="sm:w-5 sm:h-5" /> : <Mic size={18} className="sm:w-5 sm:h-5" />}
                </button>

                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask whatever you want"
                    className="w-full py-3 sm:py-4 pl-10 sm:pl-12 pr-10 sm:pr-12 bg-[#1e3a70] text-white text-sm sm:text-base rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    disabled={isLoading}
                />

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isLoading || !inputText.trim()}
                    className="absolute right-1 sm:right-2 z-10"
                >
                    <div className={`rounded-full p-1.5 sm:p-2 ${isLoading || !inputText.trim()
                        ? 'bg-[#1e3a70] text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}>
                        <ChevronRight size={16} className="sm:w-5 sm:h-5" />
                    </div>
                </motion.button>
            </div>
        </form>
    );
};

export default InputArea;