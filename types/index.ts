export interface Hotel {
  title: string;
  googleName: string;
  latitude: string;
  longitude: string;
  iframe: string;
}

export interface ScheduleParams {
  departure: Date;
  type: 'bigbus' | 'minibus' | 'individual';
  tourId: number;
}

export interface ControllerResponse<T> {
  ok: boolean;
  message: string;
  data?: T;
}

export interface ToursTableRow {
  id?: number;
  tourName?: string;
  nettPrice?: number;
  sellPrice?: number;
}

export type BusType = 'bigbus' | 'minibus';
