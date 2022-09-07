import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { isIPv4 } from 'net';

export function IsIpv4(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsIpv4Contstrain,
    });
  };
}

@ValidatorConstraint({ name: 'IsIpv4Contstrain' })
@Injectable()
export class IsIpv4Contstrain implements ValidatorConstraintInterface {
  validate(value: string) {
    return isIPv4(value);
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be valid ipv4 address`;
  }
}
