import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedules.dto';
import { UpdateScheduleDto } from './dto/update-schedules.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('schedules')
export class SchedulesController {
  constructor(private service: SchedulesService) {}

  @Post() 
  create(@Body() dto: CreateScheduleDto) { 
    return this.service.create(dto); 

  }
  @Get() 
  findAll() { 
    return this.service.findAll(); 

  }
  @Get(':id') 
  findOne(@Param('id') id: string) { 
    return this.service.findOne(id); 

  }
  @Patch(':id') 
  update(@Param('id') id: string, @Body() dto: UpdateScheduleDto) { 
    return this.service.update(id, dto); 

  }
  @Delete(':id') 
  remove(@Param('id') id: string) { 
    return this.service.remove(id); 

  }
}
