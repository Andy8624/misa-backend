import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './entities/auth/auth.module';
import { CustomerModule } from './entities/customer/customer.module';
import { PartnersModule } from './entities/partners/partners.module';
import { AccountantModule } from './entities/accountant/accountant.module';
import { EmployeeModule } from './entities/employee/employee.module';
import { UnitModule } from './entities/unit/unit.module';

@Module({
  imports: [AuthModule, AccountantModule, CustomerModule, PartnersModule, EmployeeModule, UnitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
