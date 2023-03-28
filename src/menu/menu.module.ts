import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';

@Module({
  controllers: [MenuController],
  providers: [],
})
export class MenuModule {}
