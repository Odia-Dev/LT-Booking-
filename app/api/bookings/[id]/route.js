import connectDB from "@/lib/db";
import Booking from "@/models/Booking";

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    await connectDB();
    const booking = await Booking.findByIdAndUpdate(id, body, { new: true });

    if (!booking) {
      return Response.json({ error: "Booking not found" }, { status: 404 });
    }

    return Response.json({ success: true, booking });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const booking = await Booking.findById(id);
    if (!booking) {
      return Response.json({ error: "Booking not found" }, { status: 404 });
    }
    return Response.json(booking);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
