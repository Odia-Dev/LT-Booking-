import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function runTest() {
  console.log('--- STARTING CHECKOUT TEST ---');
  
  // 1. Create Booking
  console.log('1. Testing /api/bookings...');
  const bookingRes = await fetch('http://localhost:3000/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test User',
      email: 'test@example.com',
      phone: '9999999999',
      date: '2026-05-10',
      vehicleSlug: 'test-vehicle',
      vehicleName: 'Test Vehicle Model',
      amount: 15000,
    })
  });
  const bookingData = await bookingRes.json();
  console.log('Booking Response:', bookingData);
  
  if (!bookingData.bookingId) throw new Error('Booking failed');
  console.log('✅ Booking saved in DB (ID: ' + bookingData.bookingId + ')');

  // 2. Create Order
  console.log('\n2. Testing /api/payment/create-order...');
  const orderRes = await fetch('http://localhost:3000/api/payment/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookingId: bookingData.bookingId })
  });
  const orderData = await orderRes.json();
  console.log('Order Response:', orderData);
  
  if (!orderData.order || !orderData.order.id) throw new Error('Order creation failed');
  console.log('✅ Order created in Razorpay (Order ID: ' + orderData.order.id + ')');

  // 3. Verify Payment
  console.log('\n3. Testing /api/payment/verify...');
  const dummyPaymentId = 'pay_dummy123456';
  const signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderData.order.id}|${dummyPaymentId}`)
    .digest('hex');

  const verifyRes = await fetch('http://localhost:3000/api/payment/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      razorpay_order_id: orderData.order.id,
      razorpay_payment_id: dummyPaymentId,
      razorpay_signature: signature
    })
  });
  const verifyData = await verifyRes.json();
  console.log('Verify Response:', verifyData);
  
  if (!verifyData.success) throw new Error('Payment verification failed');
  console.log('✅ Payment success -> status = Paid');

  console.log('\n--- ALL BACKEND TESTS PASSED ---');
}

runTest().catch(console.error);
