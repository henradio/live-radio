import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AzuraCastApiService} from "../../api/azura-cast-api.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  schedule?: any

  constructor(
    protected azuraCastApiService: AzuraCastApiService
  ) { }

  ngOnInit(): void {
    this.fetchSchedule();
  }

  fetchSchedule() {
    this.azuraCastApiService
      .getScheduleById(1)
      .subscribe((schedule) => {
        this.schedule = schedule
      });
  }
}
