import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PaginationMetadataDto } from "./pagination-meta.dto";

export class PaginationDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PaginationMetadataDto })
  readonly meta: PaginationMetadataDto;

  constructor(data: T[], meta: PaginationMetadataDto) {
    this.data = data;
    this.meta = meta;
  }
}