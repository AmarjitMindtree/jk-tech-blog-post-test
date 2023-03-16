import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { FacebookStrategy } from '../strategy/facebook.strategy';
import { GoogleStrategy } from '../strategy/google.strategy';
import { AuthService } from '../authentication/service/auth.service';
import { AuthController } from '../authentication/controller/auth.controller';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
  ],
  providers: [GoogleStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
