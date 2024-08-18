import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CoorEntity, EventEntity } from '../event/event.entity';

@Entity('volunteer')
export class VolunteerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @ManyToOne(() => EventEntity, event => event.volunteers)
  event: EventEntity;
  // coor:CoorEntity;
}
