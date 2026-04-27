import { NextResponse } from 'next/server';
import { razorpay } from '@/utils/razorpay';

export async function POST(req) {
  try {
    const { amount } = await req.json();
    
    const options = {
      amount: amount, // amount in the smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
