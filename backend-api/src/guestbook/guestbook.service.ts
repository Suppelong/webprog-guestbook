import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreatePostDto } from './create-post.dto';

@Injectable()
export class GuestbookService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createPostDto: CreatePostDto) {
    // This sends the "INSERT" command to Supabase
    const { data, error } = await this.supabaseService
      .getClient()
      .from('guestbook') // Ensure this matches your Supabase table name
      .insert(createPostDto);

    if (error) {
      console.error('Supabase Error:', error);
      throw new Error(error.message);
    }
    return data;
  }

  async findAll() {
    // This sends the "SELECT *" command to Supabase
    const { data, error } = await this.supabaseService
      .getClient()
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false }); // Show newest first

    if (error) {
      console.error('Supabase Error:', error);
      throw new Error(error.message);
    }
    return data;
  }
}