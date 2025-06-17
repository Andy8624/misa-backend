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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
