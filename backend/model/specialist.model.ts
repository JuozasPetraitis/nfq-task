import { Schema, model, Document } from 'mongoose';

export type Service = 'post_office' | 'bank' | 'hospital';

class Specialist {
  constructor(
    public fullName: string,
    public email: string,
    public password: string,
    public service: Service
  ) {}
}

const specialistSchema = new Schema<Specialist>({
  fullName: String,
  email: String,
  password: String,
  service: String,
});

const SpecialistModel = model<Specialist & Document>(
  'Specialist',
  specialistSchema
);

export { Specialist, SpecialistModel };
