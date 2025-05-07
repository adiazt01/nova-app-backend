import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreatePostDto {
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
