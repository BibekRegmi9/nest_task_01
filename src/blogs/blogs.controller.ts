import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Bind, UploadedFile, UploadedFiles, ParseFilePipe, Res } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from './entities/blog.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {

  constructor(private readonly blogsService: BlogsService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(@Body() body: CreateBlogDto,@UploadedFile() file:Express.Multer.File) {
    const blog = this.blogsService.createBlog(body,file.filename);
    return blog;
}


@Get(':id/url')
  async getUrl(@Param('id') id: number) {
    return this.blogsService.getImageUrl(id);
  }



  @Get()
  findAll() {
    return this.blogsService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBlogDto) {
    return this.blogsService.update(+id, dto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(+id);
  }

}
