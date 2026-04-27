import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const booking = await Booking.create({
      vehicleId: body.vehicleId,
      userName: body.name,
      userEmail: body.email,
      userPhone: body.phone,
      bookingDate: new Date(body.date),
      amount: body.amount,
      paymentStatus: body.paymentStatus,
      razorpayOrderId: body.razorpayOrderId,
      razorpayPaymentId: body.razorpayPaymentId,
    });
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  await dbConnect();
  try {
    const bookings = await Booking.find({}).populate('vehicleId');
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
