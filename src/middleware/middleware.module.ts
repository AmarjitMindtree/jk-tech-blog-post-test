import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtVerificationMiddleware } from './auth.middleware';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [JwtVerificationMiddleware],
  exports: [JwtVerificationMiddleware],
})
export class MiddlewareModule {}
