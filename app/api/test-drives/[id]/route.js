import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import TestDrive from '@/models/TestDrive';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    await connectDB();
    const updatedTestDrive = await TestDrive.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!updatedTestDrive) {
      return NextResponse.json({ error: 'Test drive not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTestDrive);
  } catch (error) {
    console.error('Test Drive Update Error:', error);
    return NextResponse.json({ error: 'Failed to update test drive' }, { status: 500 });
  }
}
