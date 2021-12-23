import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AreaInfoController } from './area-info.controller';
import { AreaInfoService } from './area-info.service';

@Module({
  imports: [HttpModule],
  controllers: [AreaInfoController],
  providers: [AreaInfoService],
})
export class AreaInfoModule {}
