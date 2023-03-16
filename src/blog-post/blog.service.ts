import { Injectable } from '@nestjs/common';
import { Blog } from '../entity/blog';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor() {}

  async findAll(): Promise<Blog[]> {
    return await Blog.findAll();
  }

  async findOne(id: string): Promise<Blog | null> {
    return await Blog.findOne({ where: { id } });
  }

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    return await Blog.create(<Blog>{
      title: createBlogDto.title,
      content: createBlogDto.content,
    });
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await Blog.findOne({ where: { id } });
    if (!blog) {
      throw new Error(`Blog post with ID ${id} not found.`);
    }
    blog.title = updateBlogDto.title ?? blog.title;
    blog.content = updateBlogDto.content ?? blog.content;
    return await Blog.create(blog);
  }

  async delete(id: string): Promise<void> {
    const result = await Blog.destroy({ where: { id } });
    if (result === 0) {
      throw new Error(`Blog post with ID ${id} not found.`);
    }
  }
}
