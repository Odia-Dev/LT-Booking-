export function generateOrderSheet(booking) {
  const dateStr = booking.booking_date 
    ? new Date(booking.booking_date).toLocaleString('en-IN') 
    : new Date().toLocaleString('en-IN');
    
  const expectedDeliveryStr = booking.expected_delivery 
    ? new Date(booking.expected_delivery).toLocaleDateString('en-IN') 
    : 'TBD';

  return `NEW BOOKING RECEIVED

Booking Date: ${dateStr}
Customer Name: ${booking.customer_name || 'N/A'}
Phone: ${booking.phone || 'N/A'}
Email: ${booking.email || 'N/A'}
City: ${booking.city || 'N/A'}

Vehicle: ${booking.vehicle_name || 'N/A'}
Variant: ${booking.variant_name || 'N/A'}
Exterior Color: ${booking.exterior_color_name || 'N/A'}
Interior Color: ${booking.interior_color_name || 'N/A'}
Suffix Code: ${booking.suffix_code || 'N/A'}

Booking Amount: ₹${(booking.booking_amount || 0).toLocaleString()}
Payment Status: ${booking.payment_status || 'Pending'}
Transaction ID: ${booking.transaction_id || 'N/A'}

Finance Required: ${booking.finance_required ? 'YES' : 'NO'}
Exchange Vehicle: ${booking.exchange_required ? 'YES' : 'NO'}
Insurance: ${booking.insurance_required ? 'YES' : 'NO'}
RTO: ${booking.rto_required ? 'YES' : 'NO'}
Corporate: ${booking.corporate ? 'YES' : 'NO'}
Accessories: ${booking.accessories ? 'YES' : 'NO'}
Extended Warranty: ${booking.extended_warranty ? 'YES' : 'NO'}
TGloss: ${booking.tgloss ? 'YES' : 'NO'}

Lead Source: ${booking.source || 'N/A'}
Preferred Branch: ${booking.preferred_branch || 'N/A'}
Preferred Contact Time: ${booking.preferred_contact_time || 'N/A'}

Expected Delivery: ${expectedDeliveryStr}
`;
}
