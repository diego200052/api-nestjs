import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as validator from 'validator';

@Injectable()
export class ValidateEmailPipe implements PipeTransform {
	transform(value: string): string {
		// Verify if the string is an email
		if (!validator.isEmail(value)) {
			throw new BadRequestException(`Invalid email format: ${value}`);
		}
        //Return valid email
		return value;
	}
}
