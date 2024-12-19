import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform {
    transform(value: string) {

        // Verify if the string is a valid objectID.
        if (!Types.ObjectId.isValid(value)) {
            throw new BadRequestException('Invalid ID format');
        }

        // Return the converted string
        return new Types.ObjectId(value);
    }
}