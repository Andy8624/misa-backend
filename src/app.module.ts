import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './entities/auth/auth.module';
import { CustomerModule } from './entities/customer/customer.module';
import { PartnersModule } from './entities/partners/partners.module';
import { AccountantModule } from './entities/accountant/accountant.module';
import { EmployeeModule } from './entities/employee/employee.module';
import { UnitModule } from './entities/unit/unit.module';
import { VatTaxModule } from './entities/vat_tax/vat_tax.module';
import { GoodsAndServicesGroupModule } from './entities/goods_and_services_group/goods_and_services_group.module';
import { ChartOfAccountModule } from './entities/chart_of_account/chart_of_account.module';
import { GoodsAndServicesModule } from './entities/goods_and_services/goods_and_services.module';
import { WarrantyPeriodModule } from './entities/warranty_period/warranty_period.module';
import { GoodsAndServicesMappingModule } from './entities/goods_and_services_mapping/goods_and_services_mapping.module';
import { WarehouseModule } from './entities/warehouse/warehouse.module';
import { InventoryInModule } from './entities/inventory_in/inventory_in.module';
import { InventoryOutModule } from './entities/inventory_out/inventory_out.module';
import { InventoryInItemModule } from './entities/inventory_in_item/inventory_in_item.module';
import { InventoryOutItemModule } from './entities/inventory_out_item/inventory_out_item.module';
import { FileModule } from './entities/file/file.module';
import { ProductionOrderModule } from './entities/production_order/production_order.module';
import { CashReceipModule } from './entities/cash_receip/cash_receip.module';
import { CashReceipVoucherItemModule } from './entities/cash_receip_voucher_item/cash_receip_voucher_item.module';
import { BankModule } from './entities/bank/bank.module';
import { CashPaymentModule } from './entities/cash-payment/cash-payment.module';
import { CashPaymentVoucherItemModule } from './entities/cash-payment-voucher-item/cash-payment-voucher-item.module';
import { BankAccountModule } from './entities/bank_account/bank_account.module';
import { DepositReceipModule } from './entities/deposit_receip/deposit_receip.module';
import { DepositPaymentModule } from './entities/deposit_payment/deposit_payment.module';
import { DepositPaymentItemModule } from './entities/deposit_payment_item/deposit_payment_item.module';
import { DepositReceipItemModule } from './entities/deposit_receip_item/deposit_receip_item.module';
import { PaymentTermModule } from './entities/payment_term/payment_term.module';
import { InvoiceModule } from './entities/invoice/invoice.module';
import { VoucherAccountEntryModule } from './entities/voucher_account_entry/voucher_account_entry.module';
import { ServicePurchaseVoucherModule } from './entities/service_purchase_voucher/service_purchase_voucher.module';
import { ServicePurchaseVoucherItemModule } from './entities/service_purchase_voucher_item/service_purchase_voucher_item.module';
import { ProvisionServiceVoucherModule } from './entities/provision_service_voucher/provision_service_voucher.module';
import { ProvisionServiceVoucherItemModule } from './entities/provision_service_voucher_item/provision_service_voucher_item.module';
import { SaleVoucherModule } from './entities/sale_voucher/sale_voucher.module';
import { SaleVoucherItemModule } from './entities/sale_voucher_item/sale_voucher_item.module';
import { PurchaseVoucherModule } from './entities/purchase_voucher/purchase_voucher.module';
import { PurchaseVoucherItemModule } from './entities/purchase_voucher_item/purchase_voucher_item.module';
import { GroupOfPurchaseGoodModule } from './entities/group_of_purchase_good/group_of_purchase_good.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { AssetWriteOffModule } from './entities/asset_write_off/asset_write_off.module';
import { AssetWriteOffAssetModule } from './entities/asset_write_off_asset/asset_write_off_asset.module';
import { AssetWriteOffAccountingModule } from './entities/asset_write_off_accounting/asset_write_off_accounting.module';
import { AssetIncrementModule } from './entities/asset_increment/asset_increment.module';
import { AssetDepreciationInfoModule } from './entities/asset_depreciation_info/asset_depreciation_info.module';
import { AssetAllocationModule } from './entities/asset_allocation/asset_allocation.module';
import { AssetFormationOriginModule } from './entities/asset_formation_origin/asset_formation_origin.module';
import { AssetComponentModule } from './entities/asset_component/asset_component.module';
import { AssetAccessoryModule } from './entities/asset_accessory/asset_accessory.module';
import { ObjectModule } from './entities/object/object.module';
import { AssetModule } from './entities/asset/asset.module';
import { AssetTypeModule } from './entities/asset_type/asset_type.module';
import { DepartmentModule } from './entities/department/department.module';
import { AssetTransferModule } from './entities/asset_transfer/asset_transfer.module';
import { AssetTransferDetailModule } from './entities/asset_transfer_detail/asset_transfer_detail.module';
import { AssetRevaluationModule } from './entities/asset_revaluation/asset_revaluation.module';
import { AssetRevaluationDetailModule } from './entities/asset_revaluation_detail/asset_revaluation_detail.module';
import { AssetRevaluationPostingModule } from './entities/asset_revaluation_posting/asset_revaluation_posting.module';
import { VoucherModule } from './entities/voucher/voucher.module';

@Module({
  imports: [
    AuthModule,
    AccountantModule,
    CustomerModule,
    PartnersModule,
    EmployeeModule,
    UnitModule,
    VatTaxModule,
    GoodsAndServicesGroupModule,
    ChartOfAccountModule,
    GoodsAndServicesModule,
    WarrantyPeriodModule,
    GoodsAndServicesMappingModule,
    WarehouseModule,
    InventoryInModule,
    InventoryOutModule,
    InventoryInItemModule,
    InventoryOutItemModule,
    FileModule,
    ProductionOrderModule,
    CashReceipModule,
    CashReceipVoucherItemModule,
    BankModule,
    CashPaymentModule,
    CashPaymentVoucherItemModule,
    BankAccountModule,
    DepositReceipModule,
    DepositPaymentModule,
    DepositPaymentItemModule,
    DepositReceipItemModule,
    PaymentTermModule,
    InvoiceModule,
    VoucherAccountEntryModule,
    ServicePurchaseVoucherModule,
    ServicePurchaseVoucherItemModule,
    ProvisionServiceVoucherModule,
    ProvisionServiceVoucherItemModule,
    SaleVoucherModule,
    SaleVoucherItemModule,
    PurchaseVoucherModule,
    PurchaseVoucherItemModule,
    GroupOfPurchaseGoodModule,
    UtilitiesModule,
    AssetWriteOffModule,
    AssetWriteOffAssetModule,
    AssetWriteOffAccountingModule,
    AssetIncrementModule,
    AssetDepreciationInfoModule,
    AssetAllocationModule,
    AssetFormationOriginModule,
    AssetComponentModule,
    AssetAccessoryModule,
    ObjectModule,
    AssetModule,
    AssetTypeModule,
    DepartmentModule,
    AssetTransferModule,
    AssetTransferDetailModule,
    AssetRevaluationModule,
    AssetRevaluationDetailModule,
    AssetRevaluationPostingModule,
    VoucherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
