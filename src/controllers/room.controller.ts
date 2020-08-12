import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Room} from '../models';
import {RoomRepository} from '../repositories';

export class RoomController {
  constructor(
    @repository(RoomRepository)
    public roomRepository : RoomRepository,
  ) {}


  @post('/rooms', {
    responses: {
      '200': {
        description: 'Room model instance',
        content: {'application/json': {schema: getModelSchemaRef(Room)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Room, {
            title: 'NewRoom',
            exclude:['id'],

          }),
        },
      },
    })
    room: Room,
  ): Promise<Room> {
    return this.roomRepository.create(room);
  }

  @get('/rooms/count', {
    responses: {
      '200': {
        description: 'Room model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Room) where?: Where<Room>,
  ): Promise<Count> {
    return this.roomRepository.count(where);
  }

  @get('/rooms', {
    responses: {
      '200': {
        description: 'Array of Room model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Room, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Room) filter?: Filter<Room>,
  ): Promise<Room[]> {
    return this.roomRepository.find(filter);
  }

  @patch('/rooms', {
    responses: {
      '200': {
        description: 'Room PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Room, {partial: true}),
        },
      },
    })
    room: Room,
    @param.where(Room) where?: Where<Room>,
  ): Promise<Count> {
    return this.roomRepository.updateAll(room, where);
  }

  @get('/rooms/{id}', {
    responses: {
      '200': {
        description: 'Room model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Room, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Room, {exclude: 'where'}) filter?: FilterExcludingWhere<Room>
  ): Promise<Room> {
    return this.roomRepository.findById(id, filter);
  }

  @patch('/rooms/{id}', {
    responses: {
      '204': {
        description: 'Room PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Room, {partial: true}),
        },
      },
    })
    room: Room,
  ): Promise<void> {
    await this.roomRepository.updateById(id, room);
  }

  @put('/rooms/{id}', {
    responses: {
      '204': {
        description: 'Room PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() room: Room,
  ): Promise<void> {
    await this.roomRepository.replaceById(id, room);
  }

  @del('/rooms/{id}', {
    responses: {
      '204': {
        description: 'Room DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.roomRepository.deleteById(id);
  }
}
