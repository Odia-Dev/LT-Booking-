import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import TestDrive from '@/models/TestDrive';

export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

    const testDrive = await TestDrive.create({
      customer_name: body.customer_name,
      phone: body.phone,
      email: body.email,
      vehicle_name: body.vehicle_name,
      preferred_date: body.preferred_date,
      preferred_branch: body.preferred_branch
    });

    return NextResponse.json({ success: true, data: testDrive }, { status: 201 });
  } catch (error) {
    console.error('Test Drive Creation Error:', error);
    return NextResponse.json({ error: 'Failed to request test drive' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const testDrives = await TestDrive.find({}).sort({ createdAt: -1 });
    return NextResponse.json(testDrives);
  } catch (error) {
    console.error('Test Drive Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch test drives' }, { status: 500 });
  }
}
