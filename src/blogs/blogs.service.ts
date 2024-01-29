import { Injectable } from '@nestjs/common';
import { Blog } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogsService {

  constructor(@InjectRepository(Blog) private repo: Repository<Blog> ){}

  
   async createBlog(dto:CreateBlogDto,fileName:string) {
    const blog =  this.repo.create({...dto,images:fileName});
    this.repo.save(blog);
    return blog;
  }


  async findAll() {
    const blog = await this.repo.find;
    return blog;
  }


  async findOne(id: number) {
    const url="http://localhost:3000"
    const blog = await this.repo.query(`select images,title,description,concat(coalesce($1,'http://localhost:3000/upload'),images) from blogs
    where id=$2`,[url,id]);
    return blog;
  }


  async getImageUrl(id: number) {
    const image = await this.repo.findOneBy({id});
    return image.images;
  }


  async update(id: number, dto: UpdateBlogDto) {
    await this.repo.update({id}, dto);
  }


  async remove(id: number) {
    await this.repo.query(`delete from blogs where id = ${id}`);
  }
}
