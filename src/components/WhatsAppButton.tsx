'use client';

import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phone: string | null;
  listingId: string;
  city: string;
  name: string;
}

export default function WhatsAppButton({ phone, listingId, city }: WhatsAppButtonProps) {
  if (!phone) return null;

  const formatPhoneNumber = (phone: string): string | null => {
    let cleaned = phone.replace(/[^\d+]/g, '').replace(/^0+/, '');
    if (cleaned.startsWith('+91')) return cleaned;
    if (cleaned.startsWith('91') && cleaned.length >= 12) return '+' + cleaned;
    if (cleaned.length === 10 && cleaned[0] >= '6') return '+91' + cleaned;
    if (cleaned.length >= 10 && cleaned.length <= 11) return '+91' + cleaned;
    if (cleaned.startsWith('91') && cleaned.length >= 11) return '+' + cleaned;
    if (cleaned.length < 10) return null;
    return '+91' + cleaned;
  };

  const formattedPhone = formatPhoneNumber(phone);
  if (!formattedPhone) return null;

  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
    `Hi, I found you on GoSolarIndex. I'm interested in a solar quote for my home.`
  )}`;

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
