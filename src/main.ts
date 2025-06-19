import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { corsOptions } from './config/cors.config';
import { JwtAuthGuard } from './config/jwt/jwt-auth.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // 1️⃣ CREATE APPLICATION INSTANCE
  const app = await NestFactory.create(AppModule);

  // 2️⃣ ENABLE CORS - Cross-Origin Resource Sharing
  // Cho phép frontend (React/Vue/Angular) gọi API từ domain khác
  app.enableCors(corsOptions);

  // 3️⃣ SETUP GLOBAL SECURITY - Authentication & Authorization
  // Bảo vệ tất cả routes bằng JWT token (trừ public routes)
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // 4️⃣ SETUP GLOBAL VALIDATION - Input Data Validation & Transformation
  app.useGlobalPipes(
    new ValidationPipe({
      // Validation options
      whitelist: true, // ✅ Chỉ cho phép properties được định nghĩa trong DTO
      forbidNonWhitelisted: true, // ✅ Throw error khi có properties không được định nghĩa
      transform: true, // ✅ Tự động transform data types (string -> number, etc.)

      // Error handling options
      disableErrorMessages: false, // ✅ Hiển thị error messages chi tiết

      // Transformation options
      transformOptions: {
        enableImplicitConversion: true, // ✅ Auto convert types (query params string -> number)
      },
    }),
  );

  // 5️⃣ SETUP API DOCUMENTATION - Swagger/OpenAPI
  const config = new DocumentBuilder()
    .setTitle('MISA Backend API') // ✅ Tên project thực tế
    .setDescription('MISA ERP System API') // ✅ Mô tả project
    .setVersion('1.0.0') // ✅ Version của API
    .addBearerAuth(
      // ✅ Thêm JWT authentication
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    // Root
    .addTag('Hello World', 'Hello World')

    // User and login
    .addTag('Authentication', 'Auth endpoints')
    .addTag('Accountants', 'Accountants User login')

    // --
    .addTag('Customers', 'Customer management')
    .addTag('Units', 'Unit management')
    .addTag('VAT Tax', 'VAT tax management')
    .addTag('Employees', 'Employee management')
    .addTag('Partners', 'Partner management')
    .addTag('Chart Of Account', 'Chart of account management')
    .addTag('Warranty Period', 'Warranty period management')
    .addTag('Goods & Services', 'Goods and services management')
    .addTag('Goods & Services Group', 'Goods and services group management')
    .addTag('Good & Service Mapping', 'Goods and services mapping management')
    .addTag('Warehouse', 'Warehouse management')
    .addTag('InventoryIn', 'Inventory in management')
    .addTag('InventoryInItem', 'Inventory in item management')
    .addTag('InventoryOutItem', 'Inventory out item management')
    .addTag('InventoryOut', 'Inventory out management')
    .addTag('ProductionOrder', 'Production Order management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // ✅ Lưu JWT token trong session
    },
  });

  // 6️⃣ START SERVER
  const port = process.env.PORT || 3000; // ✅ Default port 3000 cho development
  await app.listen(port);

  // 7️⃣ LOG SERVER INFO
  console.log(`🚀 Server running on: http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api-docs`);
}

bootstrap().catch((error) => {
  console.error('❌ Server failed to start:', error);
  process.exit(1);
});
