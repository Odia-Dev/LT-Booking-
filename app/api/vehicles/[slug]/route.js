import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Vehicle from '@/models/Vehicle';

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    let query = { slug: slug };
    if (slug.match(/^[0-9a-fA-F]{24}$/)) {
      query = { $or: [{ slug: slug }, { _id: slug }] };
    }
    const vehicle = await Vehicle.findOne(query);
    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }
    return NextResponse.json(vehicle);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
