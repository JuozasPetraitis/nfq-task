import { Request, Response } from 'express';
import { HttpStatus } from '../constant/httpCodes.constant';
import SpecialistService from '../service/specialist.service';

class SpecialistController {
  public specialistService = new SpecialistService();

  public getAll = async (req: Request, res: Response) => {
    try {
      const response = await this.specialistService.getAll(
        req.params.department
      );
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.error('Error in getAll:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  };
}

export default SpecialistController;
