import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Vehicle from '@/models/Vehicle';

export async function GET() {
  try {
    await dbConnect();
    const vehicles = await Vehicle.find({});
    return NextResponse.json(vehicles);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const vehicle = await Vehicle.create(body);
    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
