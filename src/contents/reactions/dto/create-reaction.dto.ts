import { ApiProperty } from "@nestjs/swagger";
import { ReactionType } from "../enum/reaction-type.enum";
import { TargetEntity } from "src/common/enums/target-entity.enum";
import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";

export class CreateReactionDto {
    @ApiProperty({
        description: 'The ID of the target entity (e.g., post, article) the reaction is associated with',
        example: '123e4567-e89b-12d3-a456-426614174000',
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @IsUUID('4')
    targetId: string;

    @ApiProperty({
        description: 'The type of reaction (e.g., LIKE, DISLIKE)',
        example: 'LIKE',
        enum: ReactionType,
        required: true,
    })
    @IsEnum(ReactionType)
    @IsNotEmpty()
    type: ReactionType;

    @ApiProperty({
        description: 'The type of the target entity (e.g., post, article)',
        example: 'POST',
        enum: TargetEntity,
        required: true,
    })
    @IsEnum(TargetEntity)
    @IsNotEmpty()
    targetType: TargetEntity;
}
