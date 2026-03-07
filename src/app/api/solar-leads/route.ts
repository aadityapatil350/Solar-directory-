import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, phone, city, monthlyBill, systemSize } = await request.json();

    if (!name || !phone || !city) {
      return NextResponse.json(
        { error: 'Missing required fields: name, phone, city' },
        { status: 400 }
      );
    }

    // Save solar lead to database
    const solarLead = await prisma.solarLead.create({
      data: {
        name,
        phone,
        city,
        monthlyBill: monthlyBill || 0,
        systemSize: systemSize || 0,
      },
    });

    // TODO: Send email notification to hello@gosolarindex.in
    // You can integrate with services like Resend, SendGrid, or AWS SES
    // Example with fetch to a separate email service:
    // await fetch('/api/send-email', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     to: 'hello@gosolarindex.in',
    //     subject: `New Solar Calculator Lead - ${city}`,
    //     text: `Name: ${name}\nPhone: ${phone}\nCity: ${city}\nMonthly Bill: ₹${monthlyBill}\nSystem Size: ${systemSize}kW`
    //   })
    // });

    return NextResponse.json({
      success: true,
      leadId: solarLead.id,
      message: '3 installers in ${city} will call you within 24 hours'
    });
  } catch (error) {
    console.error('Error creating solar lead:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}
