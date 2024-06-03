import { Component, OnInit } from '@angular/core'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  energyChart: any;
  energyOptions: any;



  ngOnInit() {
   let energydata = [[70507222, 83693400, 94269483, 6933054], [122194, 2078889, 2120467, 4494052], [70629416, 70629416, 70629416, 70629416], [0.17, 2.42, 2.20, 36.32]];
     let energylabel = ["2021", "2022", "2023", "2024 cumm"];
    this.energyChart =  {
      labels: energylabel,
      datasets: [
        // this.toolbarValue === 'Monthly' ?{
        //   label: "Baseline",
        //   backgroundColor: "#ff8080",
        //   data: energydata[2],
        //   stack: 'Stack 1',
        // }:
        {
          label: "Brown Energy",
          backgroundColor: "#ed7d31",
          data: energydata[0],
          stack: 'Stack 0',
          order: 1,
        },
        {
          label: "Renewable Energy",
          backgroundColor: "#00b050",
          data: energydata[1],
          stack: 'Stack 0',
          order: 1
        },
        {
          label: "Baseline",
          backgroundColor: "#ff8080",
          borderColor: "#ff8080",
          data: energydata[2],
          type: 'line',
          stack: 'Stack 1',
          order: 0
        },
        {
          label: "%",
          backgroundColor: "#999999", // Transparent background for line chart
          borderColor: "#999999",
          order: 0,
          data: [0.17, 2.42, 2.20, 39.32],
          type: 'line',
          yAxisID: 'percentage',
          datalabels: {
            display: true, // Show data labels for this dataset
            formatter: (value: string, context: any) => {
              return value + '%'; // Display only percentage value
            },
            color: 'black',
            font: {
              weight: 'bold'
            }
          }
        }
      ]
    };
    this.energyOptions = this.energyConfig;
  }



  energyConfig = {
    indexAxis: 'x',
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false,
        align: 'center',
        anchor: 'center',
      },
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 16,
          boxHeight: 16,
        },
      },
    },

    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        stacked: true,
        max: 600000,
        grid: {
          tickColor: 'transparent',
        },
        ticks: {
          display: true,
          fontColor: 'white',
        },
        title: {
          display: true,
          text: `Total Consumption (Kwh)`
        },
      },
      percentage: {
        beginAtZero: true,
        position: 'right',
        max: 40,
        min: 0,
        title: {
          display: true,
          text: 'Renewable Energy (%)'
        },
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          stepSize: 10
        }
      }
    },

  };
}
