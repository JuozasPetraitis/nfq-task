import { Router } from 'express';
import { Routes } from '../interface/routes.interface';
import BookingController from '../controller/booking.controller';
import { BookVisitDto } from '../dto/booking/booking.dto';
import { validationMiddleware } from '../middleware/validation.middleware';

class BookingRoute implements Routes {
  public path = '/booking';
  public router = Router();
  public bookingController = new BookingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/specialist/:specialist_id`,
      this.bookingController.getSpecialistBookings
    );
    this.router.get(
      `${this.path}/reservation/:reservation_code`,
      this.bookingController.checkVisit
    );
    this.router.get(
      `${this.path}/service/:department`,
      this.bookingController.getServiceBookings
    );

    this.router.post(
      this.path,
      validationMiddleware(BookVisitDto),
      this.bookingController.bookVisit
    );

    this.router.put(
      `${this.path}/:booking_id`,

      this.bookingController.updateVisitStatus
    );

    this.router.delete(
      `${this.path}/:reservation_code`,
      this.bookingController.cancelVisit
    );
  }
}

export default BookingRoute;
