import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();

  const product = await Product.create(body);
  return NextResponse.json({ message: "Product created", product });
}

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}
