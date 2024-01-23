import { AuthService } from './auth.service';

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService();
    });

    it('should be created', () => {
        expect(authService).toBeTruthy();
    });

    it('should return a token when login is successful', () => {
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;
    
        const username = adminUsername;
        const password = adminPassword;

        const token = authService.validateAdmin(username, password);

        expect(token).toBeDefined();
        expect(typeof token).toBe('boolean');
    });

    it('should throw an error when login fails', () => {
        const username = 'testuser';
        const password = 'wrongpassword';

        expect(() => authService.validateAdmin(username, password)).toThrow('Invalid credentials');
    });
});
