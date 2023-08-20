import { SpecialistModel } from '../model/specialist.model';
import { LogInDto } from '../dto/auth/login.dto';
import { RegisterDto } from '../dto/auth/register.dto';
import SpecialistRepository from '../repository/specialist.repository';
import { AuthHelper } from '../helpers/auth/auth.utils';
import { HttpStatus } from '../constant/httpCodes.constant';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { HttpException } from '../interface/httpException.interface';
import { ObjectId } from 'mongoose';

export interface TokenPayload {
  access_token: string;
}

class AuthService {
  public specialistsModel = SpecialistModel;
  private specialistRepository: SpecialistRepository;
  private authHelper: AuthHelper;

  constructor() {
    this.specialistRepository = new SpecialistRepository();
    this.authHelper = new AuthHelper();
  }

  public async register(registerDto: RegisterDto) {
    const { fullName, email, password } = registerDto;

    const isEmailAvailable =
      await this.specialistRepository.getSpecialistByEmail(email);

    if (isEmailAvailable) {
      throw new HttpException(
        HttpStatus.CONFLICT,
        `This ${email} already exists`
      );
    }

    const isFullNameAvailable =
      await this.specialistRepository.getSpecialistByFullName(fullName);

    if (isFullNameAvailable) {
      throw new HttpException(
        HttpStatus.CONFLICT,
        `This ${fullName} already exists`
      );
    }

    const hashedPassword = await this.authHelper.hashPassword(password);

    const createUserData = await this.specialistsModel.create({
      ...registerDto,
      password: hashedPassword,
    });

    const accessToken = await this.authHelper.generateJWT(createUserData._id);

    if (createUserData && accessToken) {
      return { specialist: createUserData, accessToken: accessToken };
    }
  }

  public async login(logInDto: LogInDto) {
    const { email, password } = logInDto;

    const specialist = await this.specialistRepository.getSpecialistByEmail(
      email
    );

    if (!specialist) {
      throw new HttpException(
        HttpStatus.BAD_REQUEST,
        `${email} does not exists`
      );
    }

    const isPasswordCorrect = await this.authHelper.comparePassword(
      password,
      specialist.password
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        HttpStatus.BAD_REQUEST,
        `Email or password is incorrect`
      );
    }

    const accessToken = await this.authHelper.generateJWT(specialist._id);

    if (specialist && isPasswordCorrect && accessToken) {
      return { specialist: specialist, accessToken: accessToken };
    }
  }

  public async verifyToken(token: string) {
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error(
        'Please define the JWT_SECRET_KEY environment variable inside .env'
      );
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY) as {
        _id: ObjectId;
      };

      const specialist = await this.specialistRepository.getSpecialistById(
        decodedToken._id
      );

      if (specialist) {
        return specialist;
      } else {
        throw new Error('Specialist not found or invalid credentials');
      }
    } catch (error) {
      console.error('Error in verifyToken:', error);
      throw error;
    }
  }
}

export default AuthService;
