import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  // CUSTOMER DATA
  customer_name: { type: String, required: true },
  phone: { type: String, required: true },
  phone_verified: { type: Boolean, default: false },
  email: { type: String },
  city: { type: String },
  preferred_branch: { type: String },
  preferred_contact_time: { type: String },

  // VEHICLE DATA
  vehicle_slug: { type: String, required: true },
  vehicle_name: { type: String, required: true },
  variant_name: { type: String },
  exterior_color_name: { type: String },
  exterior_color_code: { type: String },
  interior_color_name: { type: String },
  suffix_code: { type: String },

  // BOOKING DATA
  booking_amount: { type: Number, required: true }, // in INR
  currency: { type: String, default: "INR" },
  payment_status: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
  transaction_id: { type: String }, // Razorpay Payment ID
  razorpay_order_id: { type: String }, // Razorpay Order ID
  booking_date: { type: Date, default: Date.now },

  // LEAD SOURCE
  source: { type: String, enum: ["Meta Ads", "Google Ads", "Organic", "Direct"], default: "Organic" },

  // SALES INTENT
  finance_required: { type: Boolean, default: false },
  exchange_required: { type: Boolean, default: false },
  whatsapp_updates_enabled: { type: Boolean, default: false },

  // LEGAL
  privacy_policy_accepted: { type: Boolean, default: false },
  terms_accepted: { type: Boolean, default: false },

  // CRM WORKFLOW FIELDS
  insurance_required: { type: Boolean, default: false },
  rto_required: { type: Boolean, default: false },
  corporate: { type: Boolean, default: false },
  accessories: { type: Boolean, default: false },
  extended_warranty: { type: Boolean, default: false },
  tgloss: { type: Boolean, default: false },

  // STAFF FIELDS
  gem_name: { type: String },
  team_lead: { type: String },
  manager_name: { type: String },
  assigned_sales_executive: { type: String },

  // DELIVERY FIELDS
  delivery_status: { type: String, enum: ["Pending", "Processing", "Ready", "Delivered"], default: "Pending" },
  expected_delivery: { type: Date },
  delivery_notes: { type: String },
  vin_number: { type: String }, // Vehicle Identification Number assigned

  // LEAD WORKFLOW
  lead_stage: { 
    type: String, 
    enum: ["New Lead", "Contacted", "Interested", "Test Drive Scheduled", "Negotiation", "Booking Completed", "Delivered"], 
    default: "New Lead" 
  },
  lead_score: { type: Number, default: 0 }, // For hot/warm/cold
  notes: [{
    text: String,
    added_by: String,
    date: { type: Date, default: Date.now }
  }],

  // POST-BOOKING ONBOARDING DATA (PHASE 5)
  finance_docs_submitted: { type: Boolean, default: false },
  exchange_details_submitted: { type: Boolean, default: false },
  showroom_visit_requested: { type: Boolean, default: false },
  showroom_branch: { type: String },
  showroom_date: { type: Date },
  showroom_time: { type: String },

  // DETAILED ONBOARDING DATA
  finance_details: {
    aadhaar_number: { type: String },
    pan_number: { type: String },
    employment_type: { type: String },
    monthly_income: { type: Number },
    company_name: { type: String },
    bank_name: { type: String }
  },
  exchange_details: {
    brand: { type: String },
    model: { type: String },
    reg_year: { type: Number },
    km_driven: { type: Number },
    fuel_type: { type: String },
    accident_history: { type: String }
  },
  showroom_visit_notes: { type: String },

}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
