
import { CommonEntity } from "src/common/common.entity";
import { Entity, Column, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { Category } from "src/categories/entities/category.entity";

@Entity({name:'blogs'})
export class Blog extends CommonEntity {

    
    @Column()
    title: string;

    @ManyToOne(()=>Category)
    @JoinColumn({ referencedColumnName: "id",foreignKeyConstraintName:'category_id',name:'category_id'})
    category: Category;


    
    @Column({default:null})
    category_id:number;


    @Column()
    description: string;

    @Column({default:null})
    images: string;
}


