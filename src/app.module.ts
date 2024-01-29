import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { BlogsModule } from './blogs/blogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileAccessService } from './file-access/file-access.service';
import { FileAccessController } from './file-access/file-access.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory:()=>({
        storage:diskStorage({
          destination:(req,res,cb)=>{
            console.log('---------------------------')
           cb(null,'/file')
          },
          filename:(req,res,cb)=>{cb(null,'fileName')}
        })
      })
    ,}),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'../'+ 'public'),
    }), 
    CategoriesModule, BlogsModule,
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: 'postgres',
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],

  controllers: [AppController, FileAccessController],
  providers: [AppService, FileAccessService],
})
export class AppModule {
  constructor(){
    console.log(process.env.DB_TYPE)
  }
}
