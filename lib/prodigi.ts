// Prodigi API Integration
// API Docs: https://www.prodigi.com/print-api/docs/reference/

const PRODIGI_API_KEY = process.env.PRODIGI_API_KEY;
const PRODIGI_BASE_URL = 'https://api.prodigi.com/v4.0';

// Sandbox (testing) vs Live
const isSandbox = process.env.NODE_ENV !== 'production';

export interface ProdigiRecipient {
  name: string;
  email?: string;
  phoneNumber?: string;
  address: {
    line1: string;
    line2?: string;
    postalOrZipCode: string;
    countryCode: string;
    townOrCity: string;
    stateOrCounty?: string;
  };
}

export interface ProdigiItem {
  sku: string;
  copies: number;
  sizing?: 'fillPrintArea' | 'fitPrintArea' | 'stretchToPrintArea';
  attributes?: Record<string, string>;
  assets: {
    printArea: string;
    url: string;
  }[];
}

export interface CreateOrderRequest {
  merchantReference?: string;
  shippingMethod: 'Budget' | 'Standard' | 'StandardPlus' | 'Express' | 'Overnight';
  recipient: ProdigiRecipient;
  items: ProdigiItem[];
}

export interface OrderResponse {
  id: string;
  status: {
    stage: string;
    issues: string[];
  };
  charges: Array<{
    totalCost: { amount: string; currency: string };
  }>;
  shipments?: Array<{
    status: string;
    tracking?: { url: string; number: string };
  }>;
}

// Product SKU mapping - can be expanded
export const PRODUCT_SKUS = {
  // Fine Art Prints
  '8x10': 'GLOBAL-FAP-8x10',
  '11x14': 'GLOBAL-FAP-11x14',
  '16x20': 'GLOBAL-FAP-16x20',
  '16x24': 'GLOBAL-FAP-16x24',
  '24x36': 'GLOBAL-FAP-24x36',
  
  // Framed Prints
  '8x10-framed': 'GLOBAL-CFPM-8x10',
  '11x14-framed': 'GLOBAL-CFPM-11x14',
  '16x20-framed': 'GLOBAL-CFPM-16x20',
  
  // Canvas
  '12x16-canvas': 'GLOBAL-CNV-12x16',
  '16x24-canvas': 'GLOBAL-CNV-16x24',
  '24x36-canvas': 'GLOBAL-CNV-24x36',
} as const;

export type ProductSize = keyof typeof PRODUCT_SKUS;

export function getSkuForSize(size: string): string {
  const sizeKey = size.toLowerCase().replace(' ', '').replace('x', 'x') as ProductSize;
  return PRODUCT_SKUS[sizeKey] || PRODUCT_SKUS['16x20'];
}

// Get available products from Prodigi
export async function getProducts(): Promise<any[]> {
  const response = await fetch(`${PRODIGI_BASE_URL}/products`, {
    headers: {
      'X-API-Key': PRODIGI_API_KEY || '',
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.products || [];
}

// Get shipping rates/options
export async function getShippingOptions(countryCode: string): Promise<any[]> {
  const response = await fetch(
    `${PRODIGI_BASE_URL}/shipping-options?countryCode=${countryCode}`,
    {
      headers: {
        'X-API-Key': PRODIGI_API_KEY || '',
      },
    }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch shipping options: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.shippingOptions || [];
}

// Create an order
export async function createOrder(order: CreateOrderRequest): Promise<OrderResponse> {
  const response = await fetch(`${PRODIGI_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': PRODIGI_API_KEY || '',
    },
    body: JSON.stringify(order),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `Failed to create order: ${response.statusText}`);
  }
  
  return response.json();
}

// Get order status
export async function getOrder(orderId: string): Promise<OrderResponse> {
  const response = await fetch(`${PRODIGI_BASE_URL}/orders/${orderId}`, {
    headers: {
      'X-API-Key': PRODIGI_API_KEY || '',
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch order: ${response.statusText}`);
  }
  
  return response.json();
}

// Get quote for an order (without creating it)
export async function getQuote(order: CreateOrderRequest): Promise<any> {
  const response = await fetch(`${PRODIGI_BASE_URL}/quote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': PRODIGI_API_KEY || '',
    },
    body: JSON.stringify(order),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to get quote: ${response.statusText}`);
  }
  
  return response.json();
}
