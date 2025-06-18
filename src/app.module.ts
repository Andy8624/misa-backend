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
import { ChartOfAccountModule } from './entities/chart_of_account/account_main_system.module';
import { GoodsAndServicesModule } from './entities/goods_and_services/goods_and_services.module';
import { WarrantyPeriodModule } from './entities/warranty_period/warranty_period.module';
import { GoodsAndServicesMappingModule } from './entities/goods_and_services_mapping/goods_and_services_mapping.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
