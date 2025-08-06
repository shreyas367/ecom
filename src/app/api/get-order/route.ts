// /app/api/get-order/route.ts

import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return NextResponse.json({ error: 'Invalid Order ID format' }, { status: 400 });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (err) {
    console.error('GET /api/get-order error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
