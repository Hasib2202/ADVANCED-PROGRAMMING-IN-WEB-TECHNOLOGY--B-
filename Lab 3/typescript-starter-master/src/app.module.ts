import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { EventController } from './event/event.controller';
// import { EventModule } from './event/event.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VolunteerModule } from './volunteer/volunteer.module';
// EventModule
@Module({
  imports: [
    VolunteerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'hasib',
      database: 'adwt', //Change to your database name
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
