import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
  subscription: Subscription | null = null;

  displayedColumns: string[] = ['id', 'name', 'url'];
  dataSource = new MatTableDataSource<RecordItem>([]);

  constructor(private records: RecordService) {}

  ngOnInit() {
    this.subscription = this.records.getRecords().subscribe((list) => {
      this.isLoading = false;
      this.dataSource.data = list;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
