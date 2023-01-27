export interface Hotel {
  id: string;
  title: string;
  googleName: string;
  latitude: string;
  longitude: string;
  iframe: string;
  comment: string;
}

export interface HotelDB extends Omit<Hotel, 'googleName' | 'title'> {
  hotel_title: string;
  google_name: string;
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

export interface DialogProps {
  onConfirm: (e?: React.SyntheticEvent) => void;
  onCancel: (e?: React.SyntheticEvent) => void;
}
export interface HotelEditDialogProps {
  onConfirm: (hotel: Hotel) => void;
  onCancel: (e?: React.SyntheticEvent) => void;
  hotel: Hotel;
}

export interface ButtonProps {
  onClick: () => void;
}

export interface Booking {
  id: string;
  bookingInput: string;
  hotelTitle: string;
  room: string;
  pax: number;
  pickup: string;
  findings: Hotel[] | undefined;
}
