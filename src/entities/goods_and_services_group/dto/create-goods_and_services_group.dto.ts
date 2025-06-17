import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGoodsAndServicesGroupDto {
  @Expose()
  @IsNotEmpty({
    message: 'Mã nhóm dịch vụ hàng hóa không được để trống',
  })
  code: string;

  @Expose()
  @IsNotEmpty({
    message: 'Tên nhóm dịch vụ hàng hóa không được để trống',
  })
  name: string;

  @Expose()
  @IsNotEmpty({
    message: 'Trạng thái nhóm dịch vụ hàng hóa không được để trống',
  })
  status: string;

  @Expose()
  @IsOptional()
  parentGroupId: string;

  @Expose()
  @IsNotEmpty({ message: 'ID công ty không được để trống' })
  customerId: string;
}
