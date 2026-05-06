import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    await connectDB();
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!updatedBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error('Admin API Error:', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}
