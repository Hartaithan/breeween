import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecordItem } from 'src/app/models/record.model';
import { RecordService } from 'src/app/services/records.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  isLoading = true;
  list: RecordItem[] = [];
  subscription: Subscription | null = null;

  constructor(private records: RecordService) {}

  ngOnInit() {
    this.subscription = this.records.getRecords().subscribe((list) => {
      this.isLoading = false;
      this.list = list;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
