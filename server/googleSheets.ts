// Google Sheets integration for order storage
// Using the Replit Google Sheets connector

import { google } from 'googleapis';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-sheet',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Sheet not connected');
  }
  return accessToken;
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
export async function getUncachableGoogleSheetClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.sheets({ version: 'v4', auth: oauth2Client });
}

// Spreadsheet configuration
let spreadsheetId: string | null = null;

export async function getOrCreateSpreadsheet(): Promise<string> {
  if (spreadsheetId) {
    return spreadsheetId;
  }

  const sheets = await getUncachableGoogleSheetClient();
  
  // Try to find existing spreadsheet by creating a new one with a specific title
  // We'll use the SPREADSHEET_ID env var if available
  if (process.env.GOOGLE_SPREADSHEET_ID) {
    spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    return spreadsheetId;
  }

  // Create a new spreadsheet
  const response = await sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title: 'Monkey Boards Orders',
      },
      sheets: [
        {
          properties: {
            title: 'Orders',
          },
        },
      ],
    },
  });

  spreadsheetId = response.data.spreadsheetId!;
  
  // Add headers to the sheet
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Orders!A1:N1',
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        'Order ID',
        'Date',
        'Customer Name',
        'Email',
        'Phone',
        'Address',
        'City',
        'Payment Method',
        'Items',
        'Total Amount',
        'Status',
        'Notes',
        'Custom Specs',
        'Item Details'
      ]],
    },
  });

  console.log(`Created new spreadsheet with ID: ${spreadsheetId}`);
  return spreadsheetId;
}

interface OrderItem {
  productName: string;
  size: string;
  tier: string;
  woodFinish: string;
  color: string;
  quantity: number;
  price: number;
  isCustom: boolean;
  customDimensions?: { width: number; height: number };
}

interface OrderData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: string;
  notes?: string;
  items: OrderItem[];
  totalAmount: number;
}

export async function appendOrderToSheet(order: OrderData): Promise<string> {
  const sheets = await getUncachableGoogleSheetClient();
  const sheetId = await getOrCreateSpreadsheet();
  
  // Generate order ID
  const orderId = `MB-${Date.now().toString(36).toUpperCase()}`;
  const date = new Date().toISOString();
  
  // Format items for display
  const itemsSummary = order.items.map(item => 
    `${item.productName} (${item.quantity}x)`
  ).join(', ');
  
  // Format detailed items
  const itemDetails = order.items.map(item => {
    let details = `${item.productName}: ${item.size}, ${item.tier}, ${item.woodFinish}, ${item.color}, Qty: ${item.quantity}, Price: ${item.price}`;
    if (item.isCustom && item.customDimensions) {
      details += ` [Custom: ${item.customDimensions.width}cm x ${item.customDimensions.height}cm]`;
    }
    return details;
  }).join(' | ');

  // Custom specs
  const customSpecs = order.items
    .filter(item => item.isCustom && item.customDimensions)
    .map(item => `${item.customDimensions!.width}cm x ${item.customDimensions!.height}cm, ${item.tier}`)
    .join('; ') || 'N/A';

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Orders!A:N',
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        orderId,
        date,
        order.customerName,
        order.email,
        order.phone,
        order.address,
        order.city,
        order.paymentMethod.toUpperCase(),
        itemsSummary,
        order.totalAmount,
        'Pending',
        order.notes || '',
        customSpecs,
        itemDetails
      ]],
    },
  });

  return orderId;
}
