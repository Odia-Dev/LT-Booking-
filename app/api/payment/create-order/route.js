import { razorpay } from "@/utils/razorpay";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req) {
  try {
    const { bookingId } = await req.json();

    if (!bookingId) {
      return Response.json({ error: "Booking ID is required" }, { status: 400 });
    }

    await connectDB();

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return Response.json({ error: "Booking session not found" }, { status: 404 });
    }

    const amount = Number(booking?.booking_amount);
    if (isNaN(amount) || amount <= 0) {
      return Response.json({ error: "Invalid booking amount" }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // INR to Paise
      currency: "INR",
      receipt: `rcpt_${booking._id}`,
    });

    // Update with new field names
    booking.razorpay_order_id = order.id;
    await booking.save();

    return Response.json({ success: true, order });
  } catch (err) {
    console.error("Razorpay Order Creation Error:", err);
    const errorMsg = err.error?.description || err.message || "Payment gateway connection failed";
    return Response.json({ error: errorMsg }, { status: 500 });
  }
}
