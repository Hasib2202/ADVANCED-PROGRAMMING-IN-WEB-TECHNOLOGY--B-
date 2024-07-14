import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Session,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CoorDto, EventDto, EventUpdateDto, loginDto } from './event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { CoorEntity, EventEntity } from './event.entity';
import { VolunteerEntity } from 'src/volunteer/volunteer.entity';
import { promises } from 'dns';
import * as session from 'express-session';
import { SessionGuard } from './event.guard';

@Controller('event')
export class EventController {

  constructor(private readonly eventService: EventService) {}

  @Get('profile')
  getEvent(): object {
    return this.eventService.getEvent();
  }

  @Get('get/:id')
  @UseGuards(SessionGuard)
  getEventByIdp(@Param('id', ParseIntPipe) id: number, @Session() session): object {
    // console.log(typeof id);
    console.log(session.user);
    return this.eventService.getEventByIdp(id);
  }

  @Get('getbyusername/:username')
  getEventByUsername(@Param('username') username: string): Promise<EventEntity> {
    return this.eventService.getEventByUsername(username);
  }

  @Get('get/id/:id/name/:name')
  getEventByIdAndNamep(@Param('id') id: number,@Param('name') name: string,): object {
    return this.eventService.getEventByIdAndNamep(id, name);
  }

  @Get('getdetail')
  getEventByIdAndNameq(
    @Query('id') id: number,
    @Query('name') name: string,
  ): object {
    return this.eventService.getEventByIdAndNameq(id, name);
  }



  @Post('getdetail')
  getEventAll(@Body() body: { id: number; name: string }): object {
    const { id, name } = body;
    return this.eventService.getEventAll(id, name);
  }

  @Delete('delete/:id')
  deleteEventById(@Param('id') id: number): object {
    return this.eventService.deleteEventById(id);
  }

  // @Post('addevent')
  // @UsePipes(new ValidationPipe()) // Apply the validation
  // addEvent(@Body() data: EventDto): object {
  //   console.log(data);
  //   return this.eventService.addEvent(data);
  // }

  // @Post('addcoor')
  // @UsePipes(new ValidationPipe())
  // addCoor(@Body() data: CoorDto): object {
  //   console.log(data);
  //   return this.eventService.addCoor(data);
  // }
  
  @Post('addevent')
  @UsePipes(new ValidationPipe()) // Apply the validation
  addEvent(@Body() data: EventDto): Promise<EventEntity> {
    return this.eventService.addEvent(data);
  }

  @Post('addcoor')
  @UsePipes(new ValidationPipe())
  addCoor(@Body() data: CoorDto): Promise<CoorEntity> {
    return this.eventService.addCoor(data);
  }
  @Post('getdetailc')
  getCoorAll(@Body() body: { id: number; name: string }): object {
    const { id, name } = body;
    return this.eventService.getCoorAll(id, name);
  }

  // @Get('geteventdetail')
  // getAllDetail(@Body() myobj: object): object {
  //   // console.log(myobj);
  //   return this.eventService.getAllDetail(myobj);
  // }

  @Get('geteventdetail')
  getAllDetail(): Promise<EventEntity[]> {
    // console.log(myobj);
    return this.eventService.getAllDetail();
  }

  

  @Put('updateevent/:id')
  updateEvent(@Body() myobj: EventUpdateDto, @Param('id') id: number): object {
    return this.eventService.updateEvent(myobj, id);
  }

  @Post('addimage')
  @UseInterceptors(
    FileInterceptor('myfile', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 30000 }, // 30 KB limit
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          // const filename = `${Date.now()}-${file.originalname}`;
          cb(null,Date.now()+file.originalname)
          // cb(null, filename);
        },
      }),
    }),
  )
  addImage(@Body() myobj: object, @UploadedFile() file: Express.Multer.File) {
    console.log(file);
    console.log(myobj);
    return myobj;
  }


  // @Post('addvolunteer/:eventid')
  // addVolunteer(@Param('eventid') event, @Body() volunteer : VolunteerEntity) : Promise<VolunteerEntity> {
  //   return this.eventService.addVolunteer(event, volunteer);
  // }

  @Post('addvolunteer/:eventid')
  addVolunteer(@Param('eventid') eventid : EventEntity , @Body() volunteer : VolunteerEntity) : Promise<VolunteerEntity> {
    return this.eventService.addVolunteer(eventid, volunteer);
  }

  // @Post('addVolunteerC/:coorid')
  // addVolunteerC(@Param('coorid') coorid : CoorEntity , @Body() volunteer : VolunteerEntity) : Promise<VolunteerEntity> {
  //   return this.eventService.addVolunteerC(coorid, volunteer);
  // }


  @Get('geteventwithvolunteer') 
    getEventWithVolunteer() : Promise<EventEntity[]> {
      return this.eventService.getEventWithVolunteer();
  }

  @Get('geteventwithvolunteerbyid/:eventid') 
    getEventWithVolunteerbyid(@Param('eventid') eventid : number) : Promise<EventEntity[]> {
      return this.eventService.getEventWithVolunteerbyid(eventid);
  }

  @Get('getvolunteerdetails')
  getAllVolunteer(): Promise<VolunteerEntity[]> {
    // console.log(myobj);
    return this.eventService.getAllVolunteer();
  }

  @Get('getvolunteerdetailswithevent')
  getAllVolunteerWithEvent(): Promise<VolunteerEntity[]> {
    // console.log(myobj);
    return this.eventService.getAllVolunteerWithEvent();
  }

  @Get('getvolunteerdetailswitheventid')
  getAllVolunteerWithEventId(): Promise<VolunteerEntity[]> {
    // console.log(myobj);
    return this.eventService.getAllVolunteerWithEventId();
  }

  @Post('login')
  async login(@Body() myobj : loginDto, @Session() session ) : Promise<any> {
    const res =  await this.eventService.login(myobj);
    if (res==true) {
      session.user=myobj.username;
    }
    return this.eventService.login(myobj);
  }




  
}
