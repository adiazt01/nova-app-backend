import { ApiProperty } from "@nestjs/swagger";
import { PaginationMetadataInterface } from "./interface/pagination-meta.interface";

export class PaginationMetadataDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ paginationOptionsDto, itemCount }: PaginationMetadataInterface) {
    this.page = paginationOptionsDto.page ?? 1;
    this.take = paginationOptionsDto.take ?? 10;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}