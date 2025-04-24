import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { TargetEntity } from "../enums/target-entity.enum";
import { ApiProperty } from "@nestjs/swagger";

export class TargetDto {
    @ApiProperty({
        description: 'The ID of the target entity (e.g., post, article) the comment is associated with',
        example: '123e4567-e89b-12d3-a456-426614174000',
        type: String,
        required: true,
    })
    @IsUUID('4')
    @IsNotEmpty()
    targetId: string;

    @ApiProperty({
        description: 'The ID of the target entity (e.g., post, article) the comment is associated with',
        example: '123e4567-e89b-12d3-a456-426614174000',
        type: TargetEntity,
        enum: TargetEntity,
        enumName: 'TargetEntity',
    })
    @IsEnum(TargetEntity)
    @IsNotEmpty()
    targetType: TargetEntity;
}