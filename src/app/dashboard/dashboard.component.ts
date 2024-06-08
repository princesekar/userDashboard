import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  profile: any;
  interval: any;
  constructor(private sharedService: SharedService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getUserProfile();

    this.interval = setInterval(() => {
      this.getAlertsData();
      this.changeDetectorRef.detectChanges();
    }, 5000);
  }

  getUserProfile(): void {
    this.sharedService.fetchUserProfile().subscribe({
      next: (profile) => {
        this.profile = profile;
        console.log(this.profile, 'this.profile profile');
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
      }
    });
  }

  lineChartOptions = {
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };


  leaveChartOptions = {
    scales: {
      x: {
        stacked: false,
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        stacked: false,
        max: 100,
        grid: {
          tickColor: 'transparent',
        },
        ticks: {
          display: true,
          fontColor: 'white',
        },
        title: {
          display: true,
          text: `Work Percentage (%)`
        },
      },
    },
  }



  getAlertsData = () => {

    let taskData1 = this.profile.dashboard[0].task[0];
    let taskData2 = this.profile.dashboard[0].task[1];
    let leaveCData1 = this.profile.dashboard[0].status[0];
    let leaveCData2 = this.profile.dashboard[0].status[1];
    let doughnutForData = this.profile.dashboard[0].updateui;

    let lineChartData = {
      labels: ['1 Am', '2 Am', '3 Am', '4 AM', '5 AM', '6 AM', '7 AM'],
      datasets: [
        {
          label: 'Today',
          data: taskData1,
          borderColor: '#F01D1D',
          backgroundColor: '#f2b5ae',
          borderWidth: 1,
          pointRadius: 2,
          pointBackgroundColor: '#F01D1D',
          pointBorderColor: '#F01D1D',
          fill: true
        },
        {
          label: 'Yesterday',
          data: taskData2,
          borderColor: '#508b8c',
          borderWidth: 1,
          pointRadius: 2,
          backgroundColor: 'rgba(110, 190, 191, 0.2)',
          pointBackgroundColor: '#508b8c',
          pointBorderColor: '#508b8c',
          fill: true
        },
      ],
    };

    let leaveChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Current Year ',
          data: leaveCData1,
          borderColor: '#F01D1D',
          backgroundColor: '#f2b5ae',
          borderWidth: 1,
          pointRadius: 2,
          pointBackgroundColor: '#F01D1D',
          pointBorderColor: '#F01D1D',
        },
        {
          label: 'Previous Year',
          data: leaveCData2,
          borderColor: '#508b8c',
          borderWidth: 1,
          pointRadius: 2,
          backgroundColor: 'rgba(110, 190, 191, 0.2)',
          pointBackgroundColor: '#508b8c',
          pointBorderColor: '#508b8c',
        },
      ],
    };

    let doughnutData = {
      labels: [
        'New',
        'Progress',
        'Completed',
        'Canceled'
      ],
      datasets: [{
        label: 'Projects',
        data: doughnutForData,
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(68, 131, 102)',
          'rgb(255, 99, 132)',
        ],
        hoverOffset: 4
      }]
    };


    return {
      lineChartData, leaveChartData, doughnutData
    };
  };
}
