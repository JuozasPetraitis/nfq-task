import SpecialistRepository from '../repository/specialist.repository';
import { HttpStatus } from '../constant/httpCodes.constant';
import { BookingModel } from '../model/booking.model';
import { BookVisitDto } from '../dto/booking/booking.dto';
import BookingRepository from '../repository/bookings.repository';
import { HttpException } from '../interface/httpException.interface';

const VISIT_DURATION = {
  POST_OFFICE: 10,
  BANK: 30,
  HOSPITAL: 60,
};

class BookingService {
  public bookingModel = BookingModel;
  private specialistRepository: SpecialistRepository;
  private bookingRepository: BookingRepository;

  constructor() {
    this.specialistRepository = new SpecialistRepository();
    this.bookingRepository = new BookingRepository();
  }

  public async bookVisit(bookVisitDto: BookVisitDto) {
    const { email } = bookVisitDto;

    const isSpecialistExist =
      await this.specialistRepository.getSpecialistByEmail(email);

    if (!isSpecialistExist) {
      throw new HttpException(
        HttpStatus.NOT_FOUND,
        `This ${email} already exists`
      );
    }

    const reservationCode = this.generateRandomCode(8);

    const createdBooking = await this.bookingModel.create({
      specialist: isSpecialistExist,
      reservation_code: reservationCode,
      status: 'pending',
      service: isSpecialistExist.service,
    });

    if (createdBooking) {
      return reservationCode;
    }
  }

  public async checkVisit(reservationCode: string) {
    const clientBooking =
      await this.bookingRepository.getBookingByReservationCode(reservationCode);

    if (!clientBooking) {
      throw new HttpException(
        HttpStatus.NOT_FOUND,
        `Booking with reservation code ${reservationCode} does not exist`
      );
    }

    if (clientBooking.status === 'finished') {
      throw new HttpException(
        HttpStatus.CONFLICT,
        `Booking with reservation code ${reservationCode} already finished`
      );
    }

    if (clientBooking.status === 'active') {
      throw new HttpException(
        HttpStatus.CONFLICT,
        `Booking with reservation code ${reservationCode} currently active`
      );
    }

    if (clientBooking.status === 'cancelled') {
      throw new HttpException(
        HttpStatus.CONFLICT,
        `Booking with reservation code ${reservationCode} already cancelled`
      );
    }

    const specialistBookings =
      await this.specialistRepository.getAllSpecialistBookings(
        clientBooking.specialist
      );

    const clientIndex = specialistBookings.findIndex((booking) =>
      booking._id.equals(clientBooking._id)
    );

    if (clientIndex === -1) {
      throw new HttpException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `Client's booking not found in specialist's bookings`
      );
    }

    const specialist = await this.specialistRepository.getSpecialistById(
      clientBooking.specialist
    );

    let duration;
    switch (specialist.service) {
      case 'post_office':
        duration = VISIT_DURATION.POST_OFFICE;
        break;
      case 'bank':
        duration = VISIT_DURATION.BANK;
        break;

      default:
        break;
    }

    const timeLeftMinutes = clientIndex * duration;

    return `Time left until visit: ${timeLeftMinutes} minutes`;
  }

  public async cancelVisit(reservationCode: string) {
    const clientBooking =
      await this.bookingRepository.getBookingByReservationCode(reservationCode);

    if (!clientBooking) {
      throw new HttpException(
        HttpStatus.NOT_FOUND,
        `Booking with reservation code ${reservationCode} does not exist`
      );
    }

    await this.bookingModel.findOneAndUpdate(
      { reservation_code: reservationCode },
      { status: 'cancelled' }
    );
  }

  public async updateVisitStatus(bookingId: string) {
    const booking = await this.bookingRepository.getBookingById(bookingId);

    if (!booking) {
      throw new HttpException(
        HttpStatus.NOT_FOUND,
        `Booking with reservation code ${bookingId} does not exist`
      );
    }

    if (booking.status === 'active') {
      await this.bookingModel.findOneAndUpdate(
        { _id: bookingId },
        { status: 'finished' }
      );
    }

    if (booking.status === 'pending') {
      await this.bookingModel.findOneAndUpdate(
        { _id: bookingId },
        { status: 'active' }
      );
    }
  }

  public async getSpecialistBookings(specialist_id: string) {
    const specialistBookings =
      await this.bookingRepository.getBookingsBySpecialistId(specialist_id);

    if (!specialistBookings) {
      throw new HttpException(HttpStatus.NOT_FOUND, `No bookings found`);
    }

    return specialistBookings;
  }

  public async getServiceBookings(service: string) {
    const bookings = await this.bookingRepository.getBookingsByService(service);

    if (!bookings) {
      throw new HttpException(HttpStatus.NOT_FOUND, `No bookings found`);
    }

    return bookings;
  }

  private generateRandomCode = (length: number) => {
    const characters = '0123456789';
    const codeArray = Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)]
    );
    return codeArray.join('');
  };
}

export default BookingService;
