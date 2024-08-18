import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';
import { Volunteer } from './volunteer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Volunteer])],
  providers: [VolunteerService],
  controllers: [VolunteerController],
  exports: [VolunteerService],
})
export class VolunteerModule {}
