import { CheckCircle } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center animate-fade-in">
        <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank you for your order!</h1>
        <p className="text-gray-600 mb-4">
          We've sent you an email confirmation.<br />
          Your items will be on their way shortly.
        </p>
        <a href="/" className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
          Continue Shopping
        </a>
      </div>
    </div>
  );
}
