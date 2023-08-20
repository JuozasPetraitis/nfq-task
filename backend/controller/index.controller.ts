import { Response } from 'express';
import { HttpStatus } from '../constant/httpCodes.constant';

class IndexController {
  public index = (res: Response) => {
    try {
      res.sendStatus(HttpStatus.OK);
    } catch (error) {
      console.error('Error in index:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  };
}

export default IndexController;
