import { PaginationOptionsDto } from "../pagination-options.dto";

export interface PaginationMetadataInterface {
  paginationOptionsDto: PaginationOptionsDto;
  itemCount: number;
}