import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('routes')
export class RoutesController {
  constructor(private service: RoutesService) {}

  @Post() 
  create(@Body() dto: CreateRouteDto) { 
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
  update(@Param('id') id: string, @Body() dto: UpdateRouteDto) { 
    return this.service.update(id, dto); 

  }
  @Delete(':id') 
  remove(@Param('id') id: string) { 
    return this.service.remove(id); 

  }
}
