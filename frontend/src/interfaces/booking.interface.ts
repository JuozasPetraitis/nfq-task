export type VisitStatus = 'finished' | 'cancelled' | 'pending' | 'active';

export interface Booking {
  _id: string;
  specialist: string;
  reservation_code: string;
  status: VisitStatus;
}
