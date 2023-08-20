import { Router } from 'express';
import { Routes } from '../interface/routes.interface';
import AuthController from '../controller/auth.controller';
import { validationMiddleware } from '../middleware/validation.middleware';
import { RegisterDto } from '../dto/auth/register.dto';
import { LogInDto } from '../dto/auth/login.dto';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.authController.verifyToken);
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(RegisterDto),
      this.authController.register
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LogInDto),
      this.authController.login
    );
  }
}

export default AuthRoute;
