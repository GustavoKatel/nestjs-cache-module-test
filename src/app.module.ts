import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AModule } from './a.module';
import { BModule } from './b.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AModule,
    BModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
