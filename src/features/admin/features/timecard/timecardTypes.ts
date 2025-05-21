export interface Timecard {
  UserID: string;
  TimecardInfo: TimecardInfo
  Active: boolean;
  Complete: boolean;
}

export interface TimecardInfo {
    ClockIn: string
    ClockOut: string
    Duration: number
    Rate: number;
    IPAddress: string
    Location: Locale
}

export interface Locale {
    Lat: number;
    Lng: number
}