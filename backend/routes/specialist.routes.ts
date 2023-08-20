import { Router } from 'express';
import { Routes } from '../interface/routes.interface';
import SpecialistController from '../controller/specialist.controller';

class SpecialistRoute implements Routes {
  public path = '/specialist';
  public router = Router();
  public specialistController = new SpecialistController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:department`,
      this.specialistController.getAll
    );
  }
}

export default SpecialistRoute;
