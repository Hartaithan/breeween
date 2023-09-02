import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { RecordItem } from 'src/app/models/record.model';
import { PlayerService } from 'src/app/services/player.service';
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
  list = new MatTableDataSource<RecordItem>([]);

  constructor(
    private records: RecordService,
    private player: PlayerService,
  ) {}

  ngOnInit() {
    this.subscription = this.records.getRecords().subscribe((records) => {
      this.isLoading = false;
      this.list.data = records;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onRecordClick(record: RecordItem) {
    this.player.playRecord(record);
  }
}
