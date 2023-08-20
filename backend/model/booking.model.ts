import { Schema, model, Document } from 'mongoose';
import { Service } from './specialist.model';

export type VisitStatus = 'finished' | 'cancelled' | 'pending' | 'active';

interface Booking extends Document {
  specialist: Schema.Types.ObjectId;
  reservation_code: string;
  status: VisitStatus;
  service: Service;
}

const bookingSchema = new Schema<Booking>(
  {
    specialist: { type: Schema.Types.ObjectId, ref: 'Specialist' },
    reservation_code: String,
    status: String,
    service: String,
  },
  { timestamps: true }
);

const BookingModel = model<Booking & Document>('Booking', bookingSchema);

export { Booking, BookingModel };
