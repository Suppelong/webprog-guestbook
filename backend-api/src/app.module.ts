import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseService } from './supabase/supabase.service';
// vvv THESE IMPORTS ARE CRITICAL vvv
import { GuestbookController } from './guestbook/guestbook.controller';
import { GuestbookService } from './guestbook/guestbook.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  // vvv ADD GuestbookController HERE vvv
  controllers: [AppController, GuestbookController], 
  // vvv ADD GuestbookService HERE vvv
  providers: [AppService, SupabaseService, GuestbookService], 
})
export class AppModule {}