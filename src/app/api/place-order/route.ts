import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import { sendEmail } from '@/lib/sendEmail';

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();

  try {
    const order = await Order.create(data);
   await sendEmail({
  to: data.email,
  subject: "Order Confirmation",
  html: `<h1>Thank you for your order</h1><p>Order ID: ${order._id}</p>`,
});


    return NextResponse.json({ success: true, order });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
