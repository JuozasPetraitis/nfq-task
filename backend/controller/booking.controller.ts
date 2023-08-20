import { Request, Response } from 'express';
import { HttpStatus } from '../constant/httpCodes.constant';
import BookingService from '../service/bookings.service';

class BookingController {
  public bookingService = new BookingService();

  public index = (res: Response) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  };

  public bookVisit = async (req: Request, res: Response) => {
    try {
      const response = await this.bookingService.bookVisit(req.body);
      return res.status(HttpStatus.CREATED).json(response);
    } catch (error) {
      console.error('Error in bookVisit:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  };

  public checkVisit = async (req: Request, res: Response) => {
    try {
      const response = await this.bookingService.checkVisit(
        req.params.reservation_code
      );
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.error('Error in checkVisit:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  };

  public cancelVisit = async (req: Request, res: Response) => {
    try {
      const response = await this.bookingService.cancelVisit(
        req.params.reservation_code
      );
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.error('Error in cancelVisit:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  };

  public updateVisitStatus = async (req: Request, res: Response) => {
    try {
      const response = await this.bookingService.updateVisitStatus(
        req.params.booking_id
      );
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.error('Error in updateVisitStatus:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  };

  public getSpecialistBookings = async (req: Request, res: Response) => {
    try {
      const response = await this.bookingService.getSpecialistBookings(
        req.params.specialist_id
      );
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.error('Error in getSpecialistBookings:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  };

  public getServiceBookings = async (req: Request, res: Response) => {
    try {
      const response = await this.bookingService.getServiceBookings(
        req.params.department
      );
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.error('Error in getServiceBookings:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  };
}

export default BookingController;
