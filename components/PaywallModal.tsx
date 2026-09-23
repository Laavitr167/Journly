'use client';

import { useState } from 'react';

type PaywallModalProps = {
  isOpen: boolean;
  onClose: () => void;
  action: 'save' | 'pdf' | null;
  onConfirm: () => void;
};

export default function PaywallModal({
  isOpen,
  onClose,
  action,
  onConfirm,
}: PaywallModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) {
    return null;
  }

  // TODO: Integrate with Stripe or other payment provider here
  // When payment is successful, call onConfirm() and then:
  // - For 'save': persist the trip to database (currently stored in memory)
  // - For 'pdf': generate and download PDF using generateTripPdf()

  const handleConfirm = async () => {
    setIsProcessing(true);
    // In a real app, we would process payment here
    // For now, we'll simulate a successful payment after a short delay
    // and then call onConfirm
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">
          Unlock Full Features
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Loved this trip? Save it and generate more for $4.99
        </p>
        <div className="mb-6">
          <button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? 'Processing...' : 'Pay'}
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          This is a stub - payment integration coming soon
        </p>
      </div>
    </div>
  );
}