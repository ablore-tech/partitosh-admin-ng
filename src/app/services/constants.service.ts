import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  readonly PUBLISH = 'PUBLISH';
  readonly DRAFT = 'DRAFT';
  public STATUS_LIST = [
    {label: 'Publish', value: this.PUBLISH},
    {label: 'Draft', value: this.DRAFT},
  ];
  public DAYS = [
    {label: 'Monday', value: 'monday'},
    {label: 'Tuesday', value: 'tuesday'},
    {label: 'Wednesday', value: 'wednesday'},
    {label: 'Thursday', value: 'thursday'},
    {label: 'Friday', value: 'friday'},
    {label: 'Saturday', value: 'saturday'},
    {label: 'Sunday', value: 'sunday'},
  ];
  public CLASS_DURATION = [
    {label: '1-2 Hours', value: '1-2'},
    {label: '2-3 Hours', value: '2-3'},
    {label: '>3 Hours', value: '3+'},
  ];
  public CLASS_LEVELS = [
    {label: 'Elementary School (KG - Class 5)', value: 'elementary'},
    {label: 'Middle School (Class 6 - Class 8)', value: 'middle'},
    {label: 'High School (Class 9 and Class 10)', value: 'high'},
    {label: 'Sr. High School (Class 11 and Class 12)', value: 'senior_high'},
  ];

  constructor() {
  }
}
