import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { Pet } from 'src/pets/entities/pet.entity';
import { PetsService } from 'src/pets/pets.service';
import { Inject } from '@nestjs/common';

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(
    @Inject(OwnersService) private readonly ownersService: OwnersService,
    @Inject(PetsService) private readonly petsService: PetsService,
  ) {}

  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownersService.create(createOwnerInput);
  }

  @Query(() => [Owner], { name: 'owners' })
  findAll() {
    return this.ownersService.findAll();
  }

  @Query(() => Owner, { name: 'owner' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.findOne(id);
  }

  @ResolveField((returns) => [Pet])
  pets(@Parent() owner) {
    const { id } = owner;

    return this.petsService.findByOwner(id);
  }
}
