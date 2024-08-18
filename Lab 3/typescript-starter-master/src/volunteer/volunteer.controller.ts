// volunteer.controller.ts
import { Controller, Post, Put, Get, Delete, Body, Param, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { UpdatePhoneDto, VolunteerDto } from './volunteer.dto';

@Controller('volunteer')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Post('add')
  @UsePipes(new ValidationPipe())
  async createVolunteer(@Body() createVolunteerDto: VolunteerDto) {
    return await this.volunteerService.createVolunteer(createVolunteerDto);
  }

  @Put('updatephonenumber/:id')
  @UsePipes(new ValidationPipe())
  async updatePhoneNumber(@Param('id') id: string, @Body() updatePhoneDto: UpdatePhoneDto) {
    return await this.volunteerService.updatePhoneNumber(id, updatePhoneDto);
  }

  @Get('null-fullname')
  async findUsersWithNullFullName() {
    return await this.volunteerService.findUsersWithNullFullName();
  }

  @Delete('delete/:id')
  async removeUser(@Param('id') id: string) {
    await this.volunteerService.removeUser(id);
    return { message: 'Volunteer removed successfully' };
  }
}
