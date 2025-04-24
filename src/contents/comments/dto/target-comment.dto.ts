import { IntersectionType } from "@nestjs/swagger";
import { TargetDto } from "src/common/dto/target.dto";

export class TargetCommentDto extends IntersectionType(TargetDto) {

}