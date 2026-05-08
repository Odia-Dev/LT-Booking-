import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';
import { encrypt } from '@/lib/auth';

export async function POST(request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // In a real app, send OTP email here
    // For this implementation, we'll store a temporary pending session or just simulate 2FA
    // We'll return success to move to the 2FA step on the frontend
    return NextResponse.json({ message: 'Login successful, proceed to 2FA' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
