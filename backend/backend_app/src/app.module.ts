import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CitiesModule } from './cities/cities.module';
import { RoutesModule } from './routes/routes.module';
import { StopsModule } from './stops/stops.module';
import { SchedulesModule } from './schedules/schedules.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    CitiesModule,
    RoutesModule,
    StopsModule,
    SchedulesModule,
    FeedbackModule,
  ],
})
export class AppModule {}
