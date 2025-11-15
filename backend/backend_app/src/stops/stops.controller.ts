import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { StopsService } from './stops.service';
import { CreateStopDto } from './dto/create-stop.dto';
import { UpdateStopDto } from './dto/update-stop.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('stops')
export class StopsController {
  constructor(private service: StopsService) {}

  @Post() 
  create(@Body() dto: CreateStopDto) { 
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
  update(@Param('id') id: string, @Body() dto: UpdateStopDto) { 
    return this.service.update(id, dto); 

  }
  @Delete(':id') 
  remove(@Param('id') id: string) { 
    return this.service.remove(id); 

  }
}
