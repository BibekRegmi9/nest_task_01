import { Injectable } from "@nestjs/common";
import { Category } from "./entities/category.entity"
import { InjectRepository } from "@nestjs/typeorm";
import { EntityRepository, Repository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";

@EntityRepository(Category)
export class CategoriesRepository extends BaseRepository<Category> {

}
