import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibrosController } from './libros/libros.controller';
import { LibrosService } from './libros/libros.service';
import { LibrosModule } from './libros/libros.module';

@Module({
  imports: [LibrosModule],
  controllers: [AppController, LibrosController],
  providers: [AppService, LibrosService],
})
export class AppModule {}
