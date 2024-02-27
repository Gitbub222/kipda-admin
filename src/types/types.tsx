import { FieldValue } from "firebase/firestore";

export enum priorities {
    HIGH='high',
    LOW='low',
    MEDIUM='medium'
  }
  

  export interface NotificationFirebaseType{
    title: string;
    message: string;
    priority: string;
    detail: string;
    type: string;
    date: FieldValue; 
}