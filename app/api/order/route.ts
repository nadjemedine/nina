import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Extract product details (from first item if array, else fallback)
    const fallbackItem = data.items && data.items.length > 0 ? data.items[0] : null;

    const price = fallbackItem?.price || 0;
    const shippingFee = data.shippingFee || 0;

    // Map checkout form data to Sanity order schema
    const newOrder = {
      _type: 'order',
      customerName: data.fullName,
      customerPhone: data.phone,
      shippingAddress: `${data.address}, ${data.commune}, ${data.wilaya}`,
      status: 'pending',
      productName: fallbackItem?.title || "Produit de la boutique",
      size: fallbackItem?.size || "Standard",
      quantity: fallbackItem?.quantity ? fallbackItem.quantity.toString() : "1",
      price: price,
      shippingFee: shippingFee,
      totalAmount: price + shippingFee
    };

    const result = await sanityClient.create(newOrder);

    return NextResponse.json({ success: true, orderId: result._id });
  } catch (error: any) {
    console.error("Order creation failed:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
