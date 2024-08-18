import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { CoorEntity, EventEntity } from '../event/event.entity';
import { v4 as uuidv4 } from 'uuid';


// @Entity('volunteer')
// export class VolunteerEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column()
//   email: string;

//   @Column()
//   phoneNumber: string;

//   @ManyToOne(() => EventEntity, event => event.volunteers)
//   event: EventEntity;
  
//   // coor:CoorEntity;
// }





@Entity('volunteertable')
export class Volunteer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'varchar', nullable: true })
  fullName: string;

  @Column({ type: 'bigint', unsigned: true })
  phone: number;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
