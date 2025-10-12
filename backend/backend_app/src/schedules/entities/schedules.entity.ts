export class ScheduleEntity {
  id: string;
  dayOfWeek: string;
  firstBus: string;
  lastBus: string;
  frequency: number;
  routeId: string;
  createdAt: Date;
  updatedAt: Date;
}
