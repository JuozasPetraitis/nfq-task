import { Specialist, SpecialistModel } from '../model/specialist.model';
import SpecialistRepository from '../repository/specialist.repository';
import { AuthHelper } from '../helpers/auth/auth.utils';
import { HttpStatus } from '../constant/httpCodes.constant';
import { HttpException } from '../interface/httpException.interface';

class SpecialistService {
  public specialistsModel = SpecialistModel;
  private specialistRepository: SpecialistRepository;

  constructor() {
    this.specialistRepository = new SpecialistRepository();
  }

  public async getAll(department: string): Promise<Array<Specialist>> {
    const allSpecialists =
      await this.specialistRepository.getAllSpecialistsByDepartment(department);

    if (!allSpecialists) {
      throw new HttpException(
        HttpStatus.NOT_FOUND,
        `This ${department} already exists`
      );
    }

    return allSpecialists;
  }
}

export default SpecialistService;
