import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersSchema } from './schema/orders.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TrucksModule } from 'src/trucks/trucks.module';
import { UsersModule } from 'src/users/users.module';
import { LocationsModule } from 'src/locations/locations.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Orders', schema: OrdersSchema}]),
    TrucksModule,
    UsersModule,
    LocationsModule
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
  ],
  exports: [
    OrdersService
  ]
})
export class OrdersModule {}
