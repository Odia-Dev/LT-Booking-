import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    await dbConnect();
    const { email, otp } = await request.json();

    // Verification Logic
    // In production, verify against a stored OTP in Redis or DB
    // For this build, we use '123456' as the master override/demo OTP
    if (otp !== '123456') {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 401 });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    // Create session
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
    const session = await encrypt({ 
      user: { id: admin._id, email: admin.email, role: 'admin' }, 
      expires 
    });

    (await cookies()).set('admin_session', session, { 
      expires, 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    admin.lastLogin = new Date();
    await admin.save();

    return NextResponse.json({ message: '2FA Verified' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
