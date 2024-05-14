import {Component, OnInit} from '@angular/core';
import {MenubarModule} from "primeng/menubar";
import {TabMenuModule} from "primeng/tabmenu";
import {MenuItem} from "primeng/api";
import {ChartModule} from "primeng/chart";
import {CardModule} from "primeng/card";
import * as googleTrends from "google-trends-api";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    TabMenuModule,
    ChartModule,
    CardModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  basicData: any;
  trends: any;
  basicOptions: any;
  options = {
    geo: 'country code or name',
    date: 'yyyymm',
    keywords: ['some', 'list', 'of', 'keywords'],
    category: 'some category',
  }
  ngOnInit(): void {

    googleTrends.apiMethod(this.options)
      .then((results: any)=>{
        console.log("Here are your google trend results!", results);
      })
    this.items = [
      {label: 'Dashboard', icon: 'pi pi-home'},
      {label: 'Transactions', icon: 'pi pi-chart-line'},
      {label: 'Products', icon: 'pi pi-list'},
      {label: 'Messages', icon: 'pi pi-inbox'}
    ]
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Sales',
          data: [540, 325, 702, 620],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

}
