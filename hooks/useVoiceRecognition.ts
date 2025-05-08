import { useState, useRef, useEffect } from 'react';
import { VoiceRecognitionHook } from '../types';

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

const useVoiceRecognition = (): VoiceRecognitionHook => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = true;
                recognitionRef.current.interimResults = true;
                recognitionRef.current.lang = 'ru-RU';

                recognitionRef.current.onresult = (event: any) => {
                    const current = event.resultIndex;
                    const result = event.results[current];
                    const transcriptText = result[0].transcript;
                    setTranscript(transcriptText);
                };

                recognitionRef.current.onerror = (event: any) => {
                    console.error('Speech recognition error', event.error);
                    setError(`Ошибка распознавания: ${event.error}`);
                    setIsListening(false);
                };

                recognitionRef.current.onend = () => {
                    setIsListening(false);
                };
            } else {
                setError('Ваш браузер не поддерживает распознавание речи');
            }
        }
    }, []);

    const startListening = () => {
        setError(null);
        setTranscript('');

        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (err) {
                console.error('Error starting speech recognition:', err);
                setError('Не удалось запустить распознавание речи');
            }
        } else {
            setError('Распознавание речи не доступно');
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    return { isListening, transcript, startListening, stopListening, error };
};

export default useVoiceRecognition;