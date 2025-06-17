import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Public } from './public.decorator';

// ✅ Public Method - không cần JWT
export function ApiPublicEndpoint(summary: string, description?: string) {
  return applyDecorators(
    Public(), // ✅ Bypass JWT Guard
    ApiOperation({ summary, description }),
  );
}

// ✅ Protected Method - cần JWT
export function ApiProtectedEndpoint(summary: string, description?: string) {
  return applyDecorators(
    ApiOperation({ summary, description }),
    ApiBearerAuth('JWT-auth'), // ✅ Require JWT token
  );
}
