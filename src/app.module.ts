import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { AuthModule } from './authentication/authentication.module';
import { BlogModule } from './blog-post/blog.module';
import { JwtVerificationMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    if (process.env.ENABLE_MIDDLEWARE) {
      consumer.apply(JwtVerificationMiddleware).forRoutes('/blog');
    }
  }
}
