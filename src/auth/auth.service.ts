import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateAdmin(username: string, password: string): boolean {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    return username === adminUsername && password === adminPassword;
  }
}