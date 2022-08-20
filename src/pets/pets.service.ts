import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from 'src/owners/owners.service';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    private ownersService: OwnersService,
  ) {}

  async create(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = await this.petsRepository.create(createPetInput);

    return await this.petsRepository.save(newPet);
  }

  async findAll(): Promise<Pet[]> {
    return await this.petsRepository.find();
  }

  async findOne(id: number): Promise<Pet> {
    return await this.petsRepository.findOneOrFail({ where: { id: id } });
  }

  async findByOwner(id: number): Promise<Pet[]> {
    return this.petsRepository
      .createQueryBuilder('pets')
      .where('pets.ownerId = :id', { id })
      .getMany();
  }

  async getOwner(ownerId: number): Promise<Owner> {
    return await this.ownersService.findOne(ownerId);
  }
}
