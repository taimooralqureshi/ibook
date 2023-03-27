import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public bookEditMode:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}
