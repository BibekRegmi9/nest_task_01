import { Blog } from "src/blogs/entities/blog.entity";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity({name: 'file-access'})
export class FileAccess extends CommonEntity{

    @Column({default: false})
    isVisited: boolean;

    @Column({default: null})
    blog_id: number;

    @ManyToOne(()=>Blog)
    @JoinColumn({ referencedColumnName: "id",foreignKeyConstraintName:'blog_id',name:'blog_id'})
    category: Blog;

    @Column()
    file_path: string;

    
}