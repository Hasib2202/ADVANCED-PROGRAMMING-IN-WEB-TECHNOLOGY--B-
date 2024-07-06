import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoorEntity, EventEntity } from "./event.entity";
import { VolunteerEntity } from "src/volunteer/volunteer.entity";

@Module({
    imports:[ TypeOrmModule.forFeature([EventEntity,CoorEntity,VolunteerEntity])],
    exports:[EventService],
    controllers:[EventController],
    providers:[EventService],
})
export class EventModule {
}

