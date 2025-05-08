import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LoadingIndicator: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center space-x-2 text-blue-300 p-2 sm:ml-11 ml-4"
        >
            <div className="flex space-x-1">
                <motion.div
                    animate={{
                        scale: [0.5, 1, 0.5],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        delay: 0
                    }}
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-300 rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [0.5, 1, 0.5],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        delay: 0.2
                    }}
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-300 rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [0.5, 1, 0.5],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        delay: 0.4
                    }}
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-300 rounded-full"
                />
            </div>
        </motion.div>
    );
};

export default LoadingIndicator;