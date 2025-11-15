import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('cities')
export class CitiesController {
  constructor(private service: CitiesService) {}

  @Post() 
  create(@Body() dto: CreateCityDto) { 
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
  update(@Param('id') id: string, @Body() dto: UpdateCityDto) { 
    return this.service.update(id, dto); 

  }
  @Delete(':id') 
  remove(@Param('id') id: string) { 
    return this.service.remove(id); 

  }
}
