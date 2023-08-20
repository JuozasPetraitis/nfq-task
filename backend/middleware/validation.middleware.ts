import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validationMiddleware<T>(
  type: any,
  skipMissingProperties = false
): any {
  return async (req: Request, res: Response, next: NextFunction) => {
    const data = plainToClass(type, req.body);
    const errors: ValidationError[] = await validate(data, {
      skipMissingProperties,
    });

    if (errors.length > 0) {
      const errorMessages = errors
        .flatMap((error) => Object.values(error.constraints))
        .join(', ');
      return res.status(400).json({ message: errorMessages });
    }

    req.body = data;
    next();
  };
}
