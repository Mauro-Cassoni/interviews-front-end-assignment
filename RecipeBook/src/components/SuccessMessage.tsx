import React from 'react';

interface SuccessMessageProps {
    onClose: () => void;
    text: string;
    center?: boolean;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onClose, text, center = true }) => {
    const containerClass = center ? 'fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50' : '';

    return (
        <div className={containerClass}>
            <div className="bg-[var(--card)] p-8 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">{text}</h2>
                <button
                    className="button w-full"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SuccessMessage;
