import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy } from './at.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RtStrategy } from './rt.strategy';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({})
    // JwtModule.register({
    //   global: true,
    //   secret: process.env.JWT_SECRET_KEY,
    //   signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    // }),
  ],
  providers: [AuthService, AtStrategy, RtStrategy, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
