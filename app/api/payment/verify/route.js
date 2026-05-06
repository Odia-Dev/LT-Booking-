import crypto from "crypto";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";
import { generateOrderSheet } from "@/utils/orderSheet";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return Response.json({ error: "Missing required payment verification fields" }, { status: 400 });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error("RAZORPAY_KEY_SECRET is missing");
      return Response.json({ error: "Server configuration error" }, { status: 500 });
    }

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    await connectDB();

    // Find by new field name
    const booking = await Booking.findOne({ razorpay_order_id: razorpay_order_id });
    if (!booking) {
      return Response.json({ error: "Original booking reference not found" }, { status: 404 });
    }

    // Update with new field names
    booking.payment_status = "Paid";
    booking.transaction_id = razorpay_payment_id;
    
    // Generate Order Sheet and add to CRM Notes
    const orderSheetContent = generateOrderSheet(booking);
    console.log("\n====================================");
    console.log(orderSheetContent);
    console.log("====================================\n");
    
    booking.notes.push({
      text: orderSheetContent,
      added_by: "System (Auto-Generated)",
      date: new Date()
    });

    await booking.save();

    return Response.json({ success: true, message: "Payment verified and booking updated" });
  } catch (err) {
    console.error("Verification Error:", err);
    return Response.json({ error: "Payment verification failed: " + err.message }, { status: 500 });
  }
}
