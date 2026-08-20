'use client';

import { MessageCircle } from 'lucide-react';
import { whatsappUrl as buildWhatsappUrl } from '@/lib/phone';

interface WhatsAppButtonProps {
  phone: string | null;
  listingId: string;
  city: string;
  name: string;
}

export default function WhatsAppButton({ phone, listingId, city }: WhatsAppButtonProps) {
  const whatsappUrl = buildWhatsappUrl(
    phone,
    `Hi, I found you on GoSolarIndex. I'm interested in a solar quote for my home.`,
  );
  if (!whatsappUrl) return null;

  const handleClick = async () => {
    try {
      await fetch('/api/whatsapp-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId, city }),
      });
    } catch {
      // silent
    }
    window.open(whatsappUrl, '_blank');
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => { e.preventDefault(); handleClick(); }}
      className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition w-full"
    >
      <MessageCircle className="h-4 w-4" />
      Chat on WhatsApp
    </a>
  );
}
