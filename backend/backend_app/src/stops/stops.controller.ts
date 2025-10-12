import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { StopsService } from './stops.service';
import { CreateStopDto } from './dto/create-stop.dto';
import { UpdateStopDto } from './dto/update-stop.dto';

@Controller('stops')
export class StopsController {
  constructor(private readonly service: StopsService) {}

  @Post() 
  create(@Body() dto: CreateStopDto) { return this.service.create(dto); }

  @Get() 
  byRoute(@Query('routeId') routeId: string) { return this.service.findAllByRoute(routeId); }

  @Patch(':id') 
  update(@Param('id') id: string, @Body() dto: UpdateStopDto) { return this.service.update(id, dto); }

  @Delete(':id') 
  remove(@Param('id') id: string) { return this.service.remove(id); }
}
