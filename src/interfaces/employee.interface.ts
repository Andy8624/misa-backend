import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';

export interface EmployeeFilterType {
  pageSize?: number;
  page?: number;
  search?: string;
  customerId?: string;
}

export interface EmployeePaginationResponseType {
  data: ResponseEmployeeDto[];
  total: number;
  page: number;
  pageSize: number;
}
