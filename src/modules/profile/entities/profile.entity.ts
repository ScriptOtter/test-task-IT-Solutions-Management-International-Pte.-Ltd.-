import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Experience } from 'src/entities/experience.entity';
import { Project } from 'src/entities/project.entity';
import { Skill } from 'src/entities/skill.entity';

@ObjectType()
export class ProfileLink {
  @Field()
  label!: string;

  @Field()
  url!: string;
}

@ObjectType()
export class Profile {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => [ProfileLink])
  links!: ProfileLink[];

  @Field(() => [Skill])
  skills!: Skill[];

  @Field(() => [Experience])
  experience!: Experience[];

  @Field(() => [Project])
  projects!: Project[];
}
