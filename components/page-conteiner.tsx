import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface PageContainerProps {
    children: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-[#062355] text-white p-4 md:p-8"
        >
            <div className="max-w-3xl mx-auto">
                <div className="mb-6 md:mb-8">
                    <div className="bg-[#1e3a70] w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-4 md:mb-6">
                        <MessageCircle className="text-white" size={20} />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Hi there!</h1>
                    <p className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">What would you like to know?</p>
                    <p className="text-sm md:text-base text-gray-300 mb-6 md:mb-8">
                        Use one of the most common prompts below or ask your own question
                    </p>
                </div>

                {children}
            </div>
        </motion.div>
    );
};

export default PageContainer;