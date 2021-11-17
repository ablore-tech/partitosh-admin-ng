import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
   selector: 'lib-no-records',
   templateUrl: './no-records.component.html',
   styleUrls: ['./no-records.component.css']
})
export class NoRecordsComponent implements OnInit {

   @Output() refreshed = new EventEmitter();

   constructor() { }

   ngOnInit(): void {
   }

   refresh() {
      this.refreshed.emit();
   }
}
