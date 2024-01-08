// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BasicStrategy } from '../auth/basic.stratergy';

@Module({
  providers: [AuthService, BasicStrategy],
})
export class AuthModule {}