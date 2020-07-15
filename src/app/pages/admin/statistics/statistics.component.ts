import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {AdminService} from '../../../services/admin.service';
import {Statistics} from '../../../models/statistics';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, AfterViewInit {

  statistics: Statistics = new Statistics();
  earningsYear: Array<number> = new Array<number>();
  numbersYear: Array<number> = new Array<number>();
  canvas: any;
  canvas2: any;

  ctx: any;
  ctx2: any;
  number: number;

  constructor(private adminService: AdminService) {
  }

  ngAfterViewInit(): void {
    this.adminService.createStatistics().subscribe(data => this.statistics = data);

    this.adminService.numbersYear().subscribe(data => {
      this.numbersYear = data;
      this.plot();
    });

    this.adminService.earningsYear().subscribe(data => {
      this.earningsYear = data;
      this.plot();
    });
  }


  ngOnInit(): void {

    this.adminService.createStatistics().subscribe(data => {
      this.statistics = data;
      this.plot();
    });

    this.adminService.numbersYear().subscribe(data => {
      this.numbersYear = data;
      this.plot();
    });

    this.adminService.earningsYear().subscribe(data => {
      this.earningsYear = data;
      this.plot();
    });

  }

  plot() {
    this.canvas = document.getElementById('earningsYear');
    this.ctx = this.canvas.getContext('2d');
    let myChart1 = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [{
          data: this.earningsYear,
          borderWidth: 1
        }]
      },
      fill: false,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              fontSize: 30
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 30
            }
          }]
        },

        legend: {
          display: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        responsive: false,
        display: true
      }
    });

    this.canvas2 = document.getElementById('numbersYear');
    this.ctx2 = this.canvas2.getContext('2d');
    let myChart2 = new Chart(this.ctx2, {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [{
          data: this.numbersYear,
          borderWidth: 1
        }]
      },
      fill: false,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              fontSize: 54
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 54
            }
          }]
        },

        legend: {
          display: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        responsive: false,
        display: true
      }
    });
  }
}
