import { ObjectId } from 'mongoose';
import { BookingModel } from '../model/booking.model';
import { SpecialistModel } from '../model/specialist.model';

export default class SpecialistRepository {
  public getSpecialistByEmail = async (email: string) => {
    try {
      return await SpecialistModel.findOne({ email: email });
    } catch (error) {
      console.error('Error in getSpecialistByEmail:', error);
      throw error;
    }
  };

  public getSpecialistByFullName = async (fullName: string) => {
    try {
      const specialist = await SpecialistModel.findOne({ fullName: fullName });
      return specialist;
    } catch (error) {
      console.error('Error in getSpecialistByEmail:', error);
      throw error;
    }
  };

  public getSpecialistById = async (id: ObjectId) => {
    try {
      const specialist = await SpecialistModel.findOne({ _id: id });
      return specialist;
    } catch (error) {
      console.error('Error in getSpecialistByEmail:', error);
      throw error;
    }
  };

  public getAllSpecialistsByDepartment = async (department: string) => {
    try {
      const specialists = await SpecialistModel.find(
        {
          service: department,
        },
        { password: 0 }
      );
      return specialists;
    } catch (error) {
      console.error('Error in getAllSpecialistsByDepartment:', error);
      throw error;
    }
  };

  public async getAllSpecialistBookings(specialistId: ObjectId) {
    try {
      const specialistBookings = await BookingModel.find({
        specialistId: specialistId,
        status: { $in: ['pending', 'active'] },
      });

      return specialistBookings;
    } catch (error) {
      console.error('Error in getAllSpecialistBookings:', error);
      throw error;
    }
  }
}
