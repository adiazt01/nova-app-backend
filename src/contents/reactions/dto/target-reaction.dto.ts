import { IntersectionType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { TargetDto } from "src/common/dto/target.dto";

class TargetReactionOptionsDto {
    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    onlyCount: boolean = false;
}

export class TargetReactionDto extends IntersectionType(TargetDto, TargetReactionOptionsDto) {

}