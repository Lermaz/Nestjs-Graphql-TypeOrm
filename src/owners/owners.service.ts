import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownersRepository: Repository<Owner>,
  ) {}

  async create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const newOwner = await this.ownersRepository.create(createOwnerInput);

    return await this.ownersRepository.save(newOwner);
  }

  async findAll(): Promise<Owner[]> {
    return await this.ownersRepository.find();
  }

  async findOne(id: number): Promise<Owner> {
    return await this.ownersRepository.findOneOrFail({ where: { id: id } });
  }
}
