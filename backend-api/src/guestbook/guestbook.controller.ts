import { Body, Controller, Get, Post } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';
import { CreatePostDto } from './create-post.dto';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return this.guestbookService.create(createPostDto);
  }

  @Get()
  async findAll() {
    return this.guestbookService.findAll();
  }
}