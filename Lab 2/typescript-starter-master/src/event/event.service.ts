import { Injectable } from "@nestjs/common";
import { CoorDto, EventDto, loginDto } from "./event.dto";
import { CoorEntity, EventEntity } from "./event.entity";
import { CreateEventDto } from "./event.dto";
import { Repository, } from "typeorm";
import { InjectRepository, } from "@nestjs/typeorm";
import { VolunteerEntity } from "src/volunteer/volunteer.entity";
import * as bcrypt from 'bcrypt';
import { promises } from "dns";
@Injectable()
export class EventService {

    constructor(
        @InjectRepository(EventEntity)  private eventRepo: Repository<EventEntity>,
        // @InjectRepository(Manager)  private managerRepo: Repository<Manager>

        @InjectRepository(CoorEntity) private coorRepo: Repository<CoorEntity>,
        @InjectRepository(VolunteerEntity) private volunRepo: Repository<VolunteerEntity>,
    ){}

    getEvent() : object {
        return { message : 'Event Coordinator Profile'};
    }

    // getEventByIdp(id : number) : object {
    //     return { message : 'Event Coordinator Id :' + id};
    // }

    getEventByIdp(id : number) : Promise<EventEntity> {
        return this.eventRepo.findOneBy({eventid:id});
    }

    getEventByUsername(username : string ) : Promise<EventEntity> {
        return this.eventRepo.findOneBy({username:username});
    }

    getEventByIdAndNamep(id : number, name : string) : object {
        return { message : 'Id :' +id+ " Event Coordinatore name :" + name};
    }

    getEventByIdAndNameq(id : number , name : string) : object {
        return { message : 'Id :' +id+ ' Event Coordinatore name :' + name};
    }

    getEventAll(id : number , name : string) : object {
        
        return { message : 'Id :' +id+ ' Event Coordinatore name :' + name};
    }

    deleteEventById(id : number) : object {
        return { message : 'Id :'+ id + ' Deleted'}
    }

    async addEvent(myobj : EventDto): Promise <EventEntity>{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(myobj.password,salt);
        myobj.password = hashedPassword;
        return this.eventRepo.save(myobj);
    }

    
    // addCoor(myobj: CoorDto): Promise<EventEntity> {
    //     return this.eventRepo.save(myobj);
    // }

    // getAllDetail(myobj : object) : object {
    //     return myobj;
    // }

    getAllDetail() : Promise<EventEntity[]> {
        return this.eventRepo.find();
    }

    updateEvent(myobj:object, id: number): object{
        return {message: "update event: "+id, body:myobj}
    }

    getCoorAll(id: number, name: string): object {
        return { message : 'Id :' +id+ ' Event Coordinatore name :' + name};
    }

    // addEvent(myobj: EventDto): Promise<EventEntity> {
    //     const newEvent = this.eventRepo.create({
    //       fullname: myobj.name, // Ensure fullname is populated
    //       username: myobj.name, // or any other relevant field
    //       password: myobj.password,
    //     });
    //     return this.eventRepo.save(newEvent);
    //   }
    
      addCoor(myobj: CoorDto): Promise<CoorEntity> {
        // const newCoor = this.coorRepo.create(myobj);
        return this.coorRepo.save(myobj);
    }


    // addVolunteer(eventid: EventEntity, volunteer:Volunteer) : Promise<Volunteer> {
    //     volunteer.event=event;
    //     console.log(volunteer.event);
    //     return this.volunRepo.save(volunteer);
    // }

    async addVolunteer(eventid , volunteer: VolunteerEntity): Promise<VolunteerEntity> {
        //console.log(eventid);
        //console.log(volunteer);
        // const event = await this.addVolunteer.findOneBy({eventid: eventid});
        volunteer.event = eventid;
        console.log(volunteer.event);
        return this.volunRepo.save(volunteer);
    }


    // addVolunteerC(coorid, volunteer : VolunteerEntity) : Promise<VolunteerEntity>   {
    //     volunteer.coor = coorid;
    //     console.log(volunteer.coor);
    //     return this.volunRepo.save(volunteer);
    // }

    getEventWithVolunteer() : Promise<EventEntity[]> {
        return this.eventRepo.find({relations:["volunteers"]});
    }

    getEventWithVolunteerbyid(eventid:number) : Promise<EventEntity[]> {
        return this.eventRepo.find({relations:["volunteers"], where:{eventid:eventid}})
    }


    getAllVolunteer() : Promise<VolunteerEntity[]> {
        return this.volunRepo.find();
    }
    
    getAllVolunteerWithEvent() : Promise<VolunteerEntity[]> {
        return this.volunRepo.find({relations : ["event"]})
    }

    getAllVolunteerWithEventId(): Promise<VolunteerEntity[]> {
        return this.volunRepo.find({
            relations: ["event"],
            select: {
                // id: true,
                // name: true,
                // email: true,
                // phoneNumber: true,
                event: {
                    eventid: true,
                    // fullname: true,
                    // username: true,
                }
            }
        });
    }

    async login(myobj:loginDto) : Promise<boolean> {
        const pass = await this.eventRepo.findOneBy({username:myobj.username});
        if(pass) {
            const isMatch = await bcrypt.compare(myobj.password,pass.password);
            if(isMatch){
                return true;
            }
            else{
                return false;
            }
        }
    }


}
