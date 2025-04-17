import { validate } from "class-validator";
import { CreatePostDto } from "./create-post.dto";

describe('CreatePost (DTO)', () => {
  it('should have all required properties', () => {
    const dto = new CreatePostDto();

    dto.title = 'My First Post';
    dto.description = 'This is a description of my first post';
    dto.hashtags = ['#first', '#post'];

    expect(dto).toHaveProperty('title');
    expect(dto).toHaveProperty('description');
    expect(dto).toHaveProperty('hashtags');

    expect(dto.title).toBe('My First Post');
    expect(dto.description).toBe('This is a description of my first post');
    expect(dto.hashtags).toEqual(['#first', '#post']);
  });

  it('should validate the title and hashtags properties', async () => {
    const dto = new CreatePostDto();

    dto.title = 'My First Post';
    dto.description = 'This is a description of my first post';
    dto.hashtags = ['#first', '#post'];

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
    expect(errors).toEqual([]);
    expect(errors).toHaveLength(0);
  });
})