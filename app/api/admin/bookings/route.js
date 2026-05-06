import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Admin API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
