import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/paginations/pagination.dto';
import { paginate } from 'src/common/helpers/pagination.helper';
import { PaginationOptionsDto } from 'src/common/dto/paginations/pagination-options.dto';

@Injectable()
export class PostsProfilesService {
    constructor (
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) {}

    async findAllByProfileUsername(username: string, paginationOptionsDto: PaginationOptionsDto): Promise<PaginationDto<Post>> {
        try {
            const queryBuilder = this.postRepository.createQueryBuilder('posts')
                .leftJoinAndSelect('posts.user', 'user')
                .leftJoinAndSelect('user.profile', 'profile')
                .where('profile.username = :username', { username });

            return await paginate(queryBuilder, paginationOptionsDto);
        } catch (error) {
            throw new Error('Error fetching posts by profile username');
        }
    }
}
