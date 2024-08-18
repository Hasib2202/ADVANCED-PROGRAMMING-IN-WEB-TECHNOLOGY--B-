// // import { Manager } from "src/manager/manager.entity";
// import { VolunteerEntity } from 'src/volunteer/volunteer.entity';
// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// @Entity('evententity')
// export class EventEntity {
  
//   @PrimaryGeneratedColumn()
//   eventid: number;
//   @Column()
//   fullname: string;
//   @Column()
//   username: string;
//   @Column()
//   password: string;

//   @OneToMany(() => VolunteerEntity, volunteer => volunteer.event, { cascade: true })
//   volunteers: VolunteerEntity[];
// }


// @Entity('coorentity')
// export class CoorEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column()
//   password: string;

//   @Column()
//   date: Date;

//   @Column()
//   socialMediaLink: string;

//   // @OneToMany(() => VolunteerEntity, volunteer => volunteer.coor, { cascade: true })
//   // volunteers: VolunteerEntity[];
// }
