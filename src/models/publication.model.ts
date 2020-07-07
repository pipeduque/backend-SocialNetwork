import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Room} from './room.model';
import {User} from './user.model';

@model()
export class Publication extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  text: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @belongsTo(() => User)
  userId: string;

  @property({
    type: 'string',
  })
  roomId?: string;

  @hasOne(() => Room)
  room: Room;

  constructor(data?: Partial<Publication>) {
    super(data);
  }
}

export interface PublicationRelations {
  // describe navigational properties here
}

export type PublicationWithRelations = Publication & PublicationRelations;
