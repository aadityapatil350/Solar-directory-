'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  plan: 'featured' | 'premium';
  label: string;
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function PaymentButton({ plan, label }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleClick() {
    setError('');
    setLoading(true);

    try {
      // Check if logged in
      const meRes = await fetch('/api/auth/me');
      if (!meRes.ok) {
        router.push('/installers/login?from=/pricing');
        return;
      }

      const loaded = await loadRazorpay();
      if (!loaded) {
        setError('Payment gateway failed to load. Please try again.');
        return;
      }

      // Create order
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        setError(orderData.error || 'Failed to create order');
        return;
      }

      // Open Razorpay
      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'GoSolarIndex',
        description: orderData.planLabel,
        order_id: orderData.orderId,
        prefill: orderData.prefill,
        theme: { color: '#f97316' },
        handler: async (response: Record<string, string>) => {
          // Verify payment
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...response, plan }),
          });

          if (verifyRes.ok) {
            router.push('/installers/dashboard?upgraded=1');
          } else {
            setError('Payment verification failed. Contact support.');
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      });

      rzp.open();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full text-center py-3 rounded-xl font-semibold transition bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-60"
      >
        {loading ? 'Processing...' : label}
      </button>
      {error && <p className="text-red-600 text-xs mt-2 text-center">{error}</p>}
    </div>
  );
}
