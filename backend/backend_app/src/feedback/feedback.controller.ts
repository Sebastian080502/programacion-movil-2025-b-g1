import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedbacke.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('feedback')
export class FeedbackController {
  constructor(private service: FeedbackService) {}

  @Post() 
  create(@Body() dto: CreateFeedbackDto) { 
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
  update(@Param('id') id: string, @Body() dto: UpdateFeedbackDto) { 
    return this.service.update(id, dto); 

  }
  @Delete(':id') 
  remove(@Param('id') id: string) { 
    return this.service.remove(id); 
    
  }
}
