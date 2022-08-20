import { forwardRef, Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersResolver } from './owners.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { PetsModule } from 'src/pets/pets.module';

@Module({
  imports: [forwardRef(() => PetsModule), TypeOrmModule.forFeature([Owner])],
  providers: [OwnersResolver, OwnersService],
  exports: [OwnersService],
})
export class OwnersModule {}
