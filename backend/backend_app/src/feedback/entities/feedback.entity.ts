import { FeedbackKind, FeedbackStatus } from '@prisma/client';

export class FeedbackEntity {
  id: string;
  kind: FeedbackKind;        // INCIDENT | SUGGESTION
  category: string;          // "bus_lleno", "accidente", ...
  comment?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  userId?: string | null;
  routeId?: string | null;
  stopId?: string | null;
  status: FeedbackStatus;    // UNDER_REVIEW, PUBLISHED...
  upvotes: number;
  createdAt: Date;
  updatedAt: Date;
}
