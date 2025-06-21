/**
 * Supported entity types for code generation (Name show in Swagger)
 */
export enum EntityType {
  INVENTORY_IN = 'inventory-in', // Nhập kho
  INVENTORY_OUT = 'inventory-out', // Xuất kho
  CASH_RECEIPT = 'cash-receipt', // Phiếu thu tiền mặt
  CASH_PAYMENT = 'cash-payment', // Phiếu chi tiền mặt
  DEPOSIT_RECEIPT = 'deposit-receipt', // NTTK
  DEPOSIT_PAYMENT = 'deposit-payment', // UNC
  SALE_VOUCHER = 'sale-voucher', // Chứng từ bán hàng
  PURCHASE_VOUCHER = 'purchase-voucher', // Chứng từ mua hàng
  SERVICE_PURCHASE_VOUCHER = 'service-purchase-voucher', // Chứng từ bán dịch vụ
}

/**
 * Configuration for entity code generation
 */
export interface EntityCodeConfig {
  /** Name of the entity in Prisma model */
  entityName: string;

  /** Code prefix (e.g., NV, KH, PO) */
  prefix: string;

  /** Field name that contains the code in the entity */
  codeField: string;

  /** Length of the numerical part */
  padLength: number;

  /** Field name for the company ID in the entity */
  companyIdField: string;
}

/**
 * Response type for code generation
 */
export class CodeGenerationResponse {
  code: string;
}

/**
 * Configuration for entity code generation
 * Maps entity types to their specific code generation settings
 */
export const ENTITY_CODE_CONFIGS: Record<EntityType, EntityCodeConfig> = {
  [EntityType.INVENTORY_IN]: {
    entityName: 'inventoryIn',
    prefix: 'NK',
    codeField: 'voucherNumber',
    padLength: 6,
    companyIdField: 'companyId',
  },
  [EntityType.INVENTORY_OUT]: {
    entityName: 'inventoryOut',
    prefix: 'XK',
    codeField: 'voucherNumber',
    padLength: 6,
    companyIdField: 'companyId',
  },
  [EntityType.CASH_RECEIPT]: {
    entityName: 'cashReceip',
    prefix: 'PT',
    codeField: 'voucherNumber',
    padLength: 6,
    companyIdField: 'companyId',
  },
  [EntityType.CASH_PAYMENT]: {
    entityName: 'cashPayment',
    prefix: 'PC',
    codeField: 'voucherNumber',
    padLength: 6,
    companyIdField: 'companyId',
  },
  [EntityType.DEPOSIT_RECEIPT]: {
    entityName: 'depositReceip',
    prefix: 'NTTK',
    codeField: 'voucherNumber',
    padLength: 6,
    companyIdField: 'companyId',
  },
  [EntityType.DEPOSIT_PAYMENT]: {
    entityName: 'cashPayment',
    prefix: 'UNC',
    codeField: 'voucherNumber',
    padLength: 6,
    companyIdField: 'companyId',
  },
  [EntityType.SALE_VOUCHER]: {
    entityName: 'saleVoucher',
    prefix: 'BH',
    codeField: 'voucher_number',
    padLength: 6,
    companyIdField: 'companyId',
  },
  [EntityType.PURCHASE_VOUCHER]: {
    entityName: 'purchaseVoucher',
    prefix: 'MH',
    codeField: 'voucher_number',
    padLength: 6,
    companyIdField: 'companyId',
  },
  [EntityType.SERVICE_PURCHASE_VOUCHER]: {
    entityName: 'servicePurchaseVoucher',
    prefix: 'BDV',
    codeField: 'voucherNumber',
    padLength: 6,
    companyIdField: 'companyId',
  },
};
