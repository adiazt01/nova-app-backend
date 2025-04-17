import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { TargetEntity } from "../enums/target-entity.enum";

export class CreateCommentDto {
    @ApiProperty({
        description: 'The content of the comment',
        example: 'This is a comment',
        type: String,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    content: string;

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
        description: 'The type of the target entity',
        example: TargetEntity.POST,
        required: true,
        enum: TargetEntity,
        enumName: 'TargetEntity',
    })
    @IsEnum(TargetEntity)
    @IsNotEmpty()
    targetType: TargetEntity;

    @ApiPropertyOptional({
        description: 'The ID of the parent comment if this is a reply',
        example: '123e4567-e89b-12d3-a456-426614174000',
        type: String,
        required: false,
    })
    @IsUUID('4')
    @IsOptional()
    parentId?: string;
}
