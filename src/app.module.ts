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
import { PaymentReceipModule } from './entities/payment_receip/payment_receip.module';
import { CashReceipVoucherItemModule } from './entities/cash_receip_voucher_item/cash_receip_voucher_item.module';
import { PaymentReceipVoucherItemModule } from './entities/payment_receip_voucher_item/payment_receip_voucher_item.module';

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
    PaymentReceipModule,
    CashReceipVoucherItemModule,
    PaymentReceipVoucherItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
