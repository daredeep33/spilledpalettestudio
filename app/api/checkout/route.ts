import { NextRequest, NextResponse } from 'next/server'
import { createOrder, getSkuForSize } from '@/lib/prodigi'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { artwork, recipient, selectedSize, selectedFrame } = body

    if (!artwork || !recipient) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Determine the SKU based on size
    const sku = selectedSize ? getSkuForSize(selectedSize) : getSkuForSize('16x20');

    // Map artwork URL to Cloudinary URL for Prodigi
    // Prodigi needs a publicly accessible image URL
    const imageUrl = artwork.url || artwork.full

    // Create the order
    const order = await createOrder({
      merchantReference: `SP-${artwork.id}-${Date.now()}`,
      shippingMethod: 'Standard',
      recipient,
      items: [
        {
          sku,
          copies: 1,
          sizing: 'fillPrintArea',
          assets: [
            {
              printArea: 'default',
              url: imageUrl,
            },
          ],
        },
      ],
    })

    return NextResponse.json({
      success: true,
      orderId: order.id,
      status: order.status.stage,
    })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    )
  }
}
