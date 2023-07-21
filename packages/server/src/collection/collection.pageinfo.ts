import { Field, ObjectType } from '@nestjs/graphql'
import { Collection } from './collection.model';

@ObjectType()
export class PageInfo {

  @Field()
  public pageSize: number; //size of page

  @Field()
  public page: number; //current page

  @Field()
  public total: number; //total number of documents

  @Field()
  public hasNext: boolean // true if next page

  @Field()
  public hasPrev: boolean // true if has previous page
}

@ObjectType()
export class PageInfoInput {
  @Field()
  public page: number = 0;

  @Field()
  public pageSize: number = 10; //size of page
}

@ObjectType()
export class PaginatedCollections {
  @Field(() => [Collection])
  public data: Collection[]

  @Field(() => PageInfo)
  public pageInfo: PageInfo
}