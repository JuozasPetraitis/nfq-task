import { NextFunction, Request, Response } from 'express';
import AuthService from '../service/auth.service';
import { HttpStatus } from '../constant/httpCodes.constant';

class AuthController {
  public authService = new AuthService();

  public index = (res: Response) => {
    try {
      res.sendStatus(HttpStatus.OK);
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  };

  public register = async (req: Request, res: Response) => {
    try {
      const response = await this.authService.register(req.body);
      return res.status(HttpStatus.CREATED).json(response);
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const response = await this.authService.login(req.body);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.error('Error in login:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  };

  public verifyToken = async (req: Request, res: Response) => {
    try {
      const token = req.header('Authorization');
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const decodedToken = this.authService.verifyToken(token);
      return res.status(HttpStatus.OK).json(decodedToken);
    } catch (error) {
      console.error('Error in verifyToken:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred while verifying the token',
        error: error,
      });
    }
  };
}

export default AuthController;
