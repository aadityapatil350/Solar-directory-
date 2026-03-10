'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Users } from 'lucide-react';

interface WhatsAppButtonProps {
  phone: string | null;
  listingId: string;
  city: string;
  name: string;
  installerId?: string | null;
}

export default function WhatsAppButton({ phone, listingId, city, name, installerId }: WhatsAppButtonProps) {
  const [enquiryCount, setEnquiryCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch installer enquiry count when installerId is provided
  useEffect(() => {
    if (installerId && city) {
      const fetchEnquiryCount = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/installers/enquiries?city=${encodeURIComponent(city)}`);
          const installers = await response.json();

          const matchedInstaller = installers.find((i: any) => i.id === installerId);
          if (matchedInstaller) {
            setEnquiryCount(matchedInstaller.enquiryCount);
          } else {
            // Installer not found - set to 0 (don't show "0 enquired")
            setEnquiryCount(0);
          }
        } catch (error) {
          console.error('Error fetching enquiry count:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchEnquiryCount();
    }
  }, [installerId, city]);

  if (!phone) return null;

  const formatPhoneNumber = (phone: string): string | null => {
    // Remove all non-numeric characters except +
    let cleaned = phone.replace(/[^\d+]/g, '');

    // Remove leading zeros
    cleaned = cleaned.replace(/^0+/, '');

    // If it starts with +91, keep it
    if (cleaned.startsWith('+91')) {
      return cleaned;
    }

    // If it starts with 91 and is 12 digits or more, add +
    if (cleaned.startsWith('91') && cleaned.length >= 12) {
      return '+' + cleaned;
    }

    // If it's 10 digits starting with 6-9 (mobile), add +91
    if (cleaned.length === 10 && cleaned[0] >= '6') {
      return '+91' + cleaned;
    }

    // If it's 10-11 digits (landline with STD code), add +91
    if (cleaned.length >= 10 && cleaned.length <= 11) {
      return '+91' + cleaned;
    }

    // If it's 11+ digits starting with 91, add +
    if (cleaned.startsWith('91') && cleaned.length >= 11) {
      return '+' + cleaned;
    }

    // Invalid format - too short or doesn't match patterns
    if (cleaned.length < 10) {
      console.warn(`Phone too short: ${phone}`);
      return null;
    }

    // Default: add +91 for any 10+ digit number
    return '+91' + cleaned;
  };

  const formattedPhone = formatPhoneNumber(phone);

  // Don't render button if phone format is invalid
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
    } catch (error) {
      console.error('Failed to track WhatsApp click:', error);
    }
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition w-full"
      >
        <MessageCircle className="h-4 w-4" />
        Chat on WhatsApp
      </a>

      {/* Enquiries counter */}
      {enquiryCount !== null && enquiryCount > 0 && (
        <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-gray-100">
          <Users className="h-4 w-4 text-orange-500" />
          <span className="text-sm text-gray-600 font-medium">
            {enquiryCount} people enquired this week
          </span>
        </div>
      )}
    </div>
  );
}
