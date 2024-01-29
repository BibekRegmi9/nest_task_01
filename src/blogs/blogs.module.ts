import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]),

  MulterModule.registerAsync({
    useFactory:()=>({
      storage:diskStorage({
        destination:(req,res,cb)=>{
         cb(null,__dirname+'./../../upload')
        },
        filename:(req,file,cb)=>{
       const extention=file.originalname.split('.')[file.originalname.split('.').length-1]
       cb(null,new Date().getMilliseconds()+'.'+ extention)
       
        }

      })
    })
  ,})
],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
