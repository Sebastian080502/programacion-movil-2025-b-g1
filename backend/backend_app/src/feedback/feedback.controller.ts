import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ModerateFeedbackDto } from './dto/moderate-feedback.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly service: FeedbackService) {}

  // crear reporte (autenticado recomendado; si quieres anónimo, quita el guard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: any, @Body() dto: CreateFeedbackDto) {
    return this.service.create(req.user?.userId ?? null, dto);
  }

  @Get()
  list(@Query('routeId') routeId?: string, @Query('stopId') stopId?: string) {
    return this.service.list(routeId, stopId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFeedbackDto) {
    return this.service.update(id, dto);
  }

  @Patch(':id/status')
  moderate(@Param('id') id: string, @Body() dto: ModerateFeedbackDto) {
    return this.service.moderate(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
