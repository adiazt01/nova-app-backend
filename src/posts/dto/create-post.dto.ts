import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreatePostDto {
    @ApiProperty({
        default: "My First Post",
        description: "The title of the post",
        example: "My First Post",
        required: true,
    })
    @IsString()
    title: string;

    @ApiPropertyOptional({
        default: "This is a description of my first post",
        description: "The description of the post",
        example: "This is a description of my first post",
        required: false,
    })
    @IsOptional()
    @IsString()
    description: string;

    @ApiPropertyOptional({
        default: ["#first", "#post"],
        description: "The hashtags of the post",
        example: ["#first", "#post"],
        required: true,
    })
    @IsOptional()
    @IsString({ each: true })
    hashtags: string[];
}
