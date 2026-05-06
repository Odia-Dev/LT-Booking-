import connectDB from "@/lib/db";
import Booking from "@/models/Booking";
import { getBranchByName } from "@/constants/branches";

export async function POST(req) {
  try {
    const body = await req.json();

    // Required Field Validation
    if (!body.customer_name || !body.phone || !body.vehicle_slug || !body.vehicle_name) {
      return Response.json({ error: "Required customer and vehicle data missing" }, { status: 400 });
    }

    // Phone format validation (basic Indian phone numbers)
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = body.phone.replace(/\D/g, '').slice(-10);
    if (!phoneRegex.test(cleanPhone)) {
      return Response.json({ error: "Invalid phone number format. Please provide a valid 10-digit number." }, { status: 400 });
    }

    await connectDB();

    // SPAM PREVENTION: Check if same phone booked in last 5 minutes
    const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentBooking = await Booking.findOne({ 
      phone: body.phone, 
      createdAt: { $gte: fiveMinsAgo } 
    });

    if (recentBooking) {
      return Response.json({ error: "Multiple booking requests detected. Please try again after 5 minutes." }, { status: 429 });
    }

    // Auto Lead Routing Architecture
    let team_lead, manager_name, gem_name;
    if (body.preferred_branch) {
      const branchDetails = getBranchByName(body.preferred_branch);
      if (branchDetails && branchDetails.salesTeam) {
        team_lead = branchDetails.salesTeam.team_lead;
        manager_name = branchDetails.salesTeam.manager_name;
        gem_name = branchDetails.salesTeam.gem_name;
      }
    }

    const booking = await Booking.create({
      customer_name: body.customer_name,
      phone: body.phone,
      email: body.email,
      city: body.city,
      vehicle_slug: body.vehicle_slug,
      vehicle_name: body.vehicle_name,
      variant_name: body.variant_name,
      exterior_color_name: body.exterior_color_name,
      interior_color_name: body.interior_color_name,
      finance_required: body.finance_required,
      exchange_required: body.exchange_required,
      preferred_branch: body.preferred_branch,
      preferred_contact_time: body.preferred_contact_time,
      whatsapp_updates_enabled: body.whatsapp_updates_enabled,
      privacy_policy_accepted: body.privacy_policy_accepted,
      terms_accepted: body.terms_accepted,
      phone_verified: body.phone_verified,
      booking_amount: body.booking_amount || 50000,
      payment_status: "Pending",
      source: body.source || "Website",
      // CRM Workflow Staff Auto-Assignment
      team_lead,
      manager_name,
      gem_name
    });

    return Response.json({ 
      success: true, 
      bookingId: booking._id,
      message: "Booking initialized successfully" 
    });
  } catch (err) {
    console.error("Booking API Error:", err);
    return Response.json({ error: "Failed to initialize booking: " + err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return Response.json(bookings);
  } catch (err) {
    return Response.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
