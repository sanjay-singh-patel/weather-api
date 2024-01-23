import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateAdmin(username: string, password: string): boolean {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (username === adminUsername && password === adminPassword) {
      return true;
    } else {
      throw new Error('Invalid credentials');
    }
  }
}