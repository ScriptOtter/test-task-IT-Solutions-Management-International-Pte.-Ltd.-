import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  repository?: string;
}
