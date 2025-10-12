import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly service: SchedulesService) {}

  @Post() 
  create(@Body() dto: CreateScheduleDto) { return this.service.create(dto); }

  @Get() 
  byRoute(@Query('routeId') routeId: string) { return this.service.findByRoute(routeId); }

  @Patch(':id') 
  update(@Param('id') id: string, @Body() dto: UpdateScheduleDto) { return this.service.update(id, dto); }

  @Delete(':id') 
  remove(@Param('id') id: string) { return this.service.remove(id); }
}
