import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { EntityRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './categories.repository';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class CategoriesService  {
  constructor(@InjectRepository(Category) private repo: Repository<Category> ){}
      
  
  async createUser(data) {
  
    const category =   this.repo.create(data);
    
    await  this.repo.save(category);
    return category;
  }

  async findAll() {
    const category = await this.repo.query(`select * from categories;`);
    return category;
  }

  async findOne(id: number) {
    const category = await this.repo.findOne({where:{id}});
    return category;
  }

  async update(id:number,dto:UpdateCategoryDto) {
    const category = await this.repo.update({id},dto);
    return category; 
  }

  async remove(id: number) {
    await this.repo.query(`delete from categories where id = ${id}`);
  }
}
