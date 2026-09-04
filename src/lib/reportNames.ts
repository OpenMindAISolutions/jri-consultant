/**
 * Report names, so a consultant sees "GSTR-1 (Sales)" and not "gstr1-sales".
 *
 * GENERATED from the user app's `src/lib/reportCatalog.ts` — the 42 reports that product has.
 * This duplication is the price of the separate repo, and it is deliberate rather than accidental:
 * copying two fields keeps the two apps in step without dragging 23 report components across.
 *
 * DRIFT RULE: an unknown key must render the key itself, never blank. A report added to the user
 * app and not here still works — it just shows its id until this file is regenerated. Failing soft
 * matters more than looking tidy, because the alternative is a nameless row a consultant cannot
 * identify. Regenerate with the script in the repo README.
 */
export interface ReportMeta { name: string; category: string }

export const REPORT_NAMES: Record<string, ReportMeta> = {
  'balance-sheet': { name: 'Balance Sheet', category: 'Favourite' },
  'gstr1-sales': { name: 'GSTR-1 (Sales)', category: 'Favourite' },
  'profit-loss': { name: 'Profit And Loss Report', category: 'Favourite' },
  'sales-summary': { name: 'Sales Summary', category: 'Favourite' },
  'gstr2-purchase': { name: 'GSTR-2 (Purchase)', category: 'GST' },
  'gstr3b': { name: 'GSTR-3b', category: 'GST' },
  'gst-purchase-hsn': { name: 'GST Purchase (With HSN)', category: 'GST' },
  'gst-sales-hsn': { name: 'GST Sales (With HSN)', category: 'GST' },
  'hsn-sales-summary': { name: 'HSN Wise Sales Summary', category: 'GST' },
  'tds-payable': { name: 'TDS Payable', category: 'GST' },
  'tds-receivable': { name: 'TDS Receivable', category: 'GST' },
  'tcs-payable': { name: 'TCS Payable', category: 'GST' },
  'tcs-receivable': { name: 'TCS Receivable', category: 'GST' },
  'tds-tcs-dashboard': { name: 'TDS & TCS Dashboard', category: 'GST' },
  'audit-trail': { name: 'Audit Trail', category: 'Transaction' },
  'bill-wise-profit': { name: 'Bill Wise Profit', category: 'Transaction' },
  'cash-bank-report': { name: 'Cash and Bank Report (All Payments)', category: 'Transaction' },
  'daybook': { name: 'Daybook', category: 'Transaction' },
  'expense-category': { name: 'Expense Category Report', category: 'Transaction' },
  'expense-transaction': { name: 'Expense Transaction Report', category: 'Transaction' },
  'purchase-summary': { name: 'Purchase Summary', category: 'Transaction' },
  'item-party': { name: 'Item Report By Party', category: 'Item' },
  'item-sales-purchase': { name: 'Item Sales and Purchase Summary', category: 'Item' },
  'low-stock': { name: 'Low Stock Summary', category: 'Item' },
  'rate-list': { name: 'Rate List', category: 'Item' },
  'stock-detail': { name: 'Stock Detail Report', category: 'Item' },
  'receivable-ageing': { name: 'Receivable Ageing Report', category: 'Party' },
  'party-item': { name: 'Party Report By Item', category: 'Party' },
  'party-statement': { name: 'Party Statement (Ledger)', category: 'Party' },
  'party-outstanding': { name: 'Party Wise Outstanding', category: 'Party' },
  'sales-category': { name: 'Sales Summary - Category Wise', category: 'Party' },
  'pos-sales-summary': { name: 'POS Sales Summary', category: 'POS & Retail' },
  'pos-terminal-report': { name: 'Terminal-wise Sales', category: 'POS & Retail' },
  'pos-payment-methods': { name: 'POS Payment Methods', category: 'POS & Retail' },
  'pos-session-report': { name: 'Session Reconciliation', category: 'POS & Retail' },
  'pos-operator-report': { name: 'Operator Performance', category: 'POS & Retail' },
  'po-status-report': { name: 'Purchase Order Status', category: 'Purchase & Inventory' },
  'grn-summary': { name: 'Goods Receipt Summary', category: 'Purchase & Inventory' },
  'vendor-bill-aging': { name: 'Vendor Bill Aging', category: 'Purchase & Inventory' },
  'three-way-match': { name: 'Three-Way Match Report', category: 'Purchase & Inventory' },
  'stock-variance': { name: 'Stock Take Variance', category: 'Purchase & Inventory' },
  'location-stock': { name: 'Location-wise Stock', category: 'Purchase & Inventory' },
};

export function reportName(key: string): string {
  return REPORT_NAMES[key]?.name ?? key;
}

export function reportCategory(key: string): string {
  return REPORT_NAMES[key]?.category ?? 'Other';
}
