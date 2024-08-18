// volunteer.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Volunteer } from './volunteer.entity';
import { UpdatePhoneDto, VolunteerDto } from './volunteer.dto';

@Injectable()
export class VolunteerService {
  constructor(
    @InjectRepository(Volunteer)
    private volunteerRepository: Repository<Volunteer>,
  ) {}

  async createVolunteer(createVolunteerDto: VolunteerDto): Promise<Volunteer> {
    const volunteer = this.volunteerRepository.create(createVolunteerDto);
    return await this.volunteerRepository.save(volunteer);
  }

  async updatePhoneNumber(id: string, updatePhoneDto: UpdatePhoneDto): Promise<void> {
    await this.volunteerRepository.update(id, updatePhoneDto);
  }

  async findUsersWithNullFullName(): Promise<Volunteer[]> {
    return await this.volunteerRepository.find({ where: { fullName: null } });
  }

  async removeUser(id: string): Promise<void> {
    await this.volunteerRepository.delete(id);
  }
}
