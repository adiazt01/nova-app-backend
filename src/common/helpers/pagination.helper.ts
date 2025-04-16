import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { PaginationOptionsDto } from '../dto/paginations/pagination-options.dto';
import { PaginationDto } from '../dto/paginations/pagination.dto';
import { PaginationMetadataDto } from '../dto/paginations/pagination-meta.dto';

export async function paginate<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  paginationOptionsDto: PaginationOptionsDto,
): Promise<PaginationDto<T>> {
  const itemCount = await queryBuilder.getCount();

  queryBuilder
    .skip(paginationOptionsDto.skip)
    .take(paginationOptionsDto.take);

  const { entities } = await queryBuilder.getRawAndEntities();

  const pageMetaDto = new PaginationMetadataDto({ itemCount, paginationOptionsDto: paginationOptionsDto });

  return new PaginationDto(entities, pageMetaDto);
}