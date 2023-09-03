import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewRecordItem } from 'src/app/models/record.model';
import { RecordService } from 'src/app/services/records.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
  });

  constructor(private records: RecordService) {}

  onSubmit() {
    if (!this.form.value.name || !this.form.value.url) return;
    const record: NewRecordItem = {
      name: this.form.value.name,
      url: this.form.value.url,
    };
    this.records.addRecord(record).then(() => this.form.reset());
  }
}
