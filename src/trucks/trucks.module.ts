import { Module } from '@nestjs/common';
import { TrucksController } from './trucks.controller';
import { TrucksService } from './trucks.service';
import { TrucksSchema } from './schema/trucks.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Trucks', schema: TrucksSchema}]),
  ],
  controllers: [TrucksController],
  providers: [
    TrucksService
  ],
  exports: [TrucksService]
})
export class TrucksModule {}
