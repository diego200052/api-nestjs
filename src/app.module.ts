import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TrucksModule } from './trucks/trucks.module';
import { OrdersModule } from './orders/orders.module';
import { LocationsModule } from './locations/locations.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true,
		}),
		MongooseModule.forRoot(process.env.DB_URI),
		UsersModule,
		AuthModule,
		TrucksModule,
		OrdersModule],
		LocationsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
