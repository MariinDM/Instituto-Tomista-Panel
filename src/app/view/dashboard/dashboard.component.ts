import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexAnnotations,
  ApexFill,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { DialogInfoComponent } from './dialog-info/dialog-info.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: any; //ApexXAxis;
  annotations: ApexAnnotations;
  fill: ApexFill;
  stroke: ApexStroke;
  grid: ApexGrid;
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../app.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any[] = []
  loader = true
  filter: string = ''
  user: any = {};
  evaluations: any[] = []
  role: number = 0
  answers: any = {}
  configuration: any[] = []

  constructor(
    private apiService: ApiServiceService,
    private _snack: MatSnackBar,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.apiService.profile().subscribe({
      next: (v) => {
        // console.log(v)
        this.role = v.me.role.id
        this.user.email = v.me.email
        this.user.full_name = `${v.me.profile.name} ${v.me.profile.last_name}`
        this.user.group = v.me.student ? `${v.me.student?.group.grade.name} ${v.me.student?.group.section.name}` : ''
        this.user.level = v.me.student?.group?.groupUserLessons[0]?.education_level.name

        if (this.role === 3) {
          this.apiService.getAuthEvaluations().subscribe({
            next: (v) => {
              this.evaluations = v.evaluations
            },
            error: (e) => {
              console.log(e)
            }
          })
        }
        if (this.role === 2) {
          this.apiService.getAnswers().subscribe({
            next: (v) => {
              this.scoreGraphics(v.evaluations)
            },
            error: (e) => {
              console.log(e)
            }
          })
        }
      },
      error: (e) => {
        console.log(e)
      }
    })


    // console.log(this.user)
  }

  testQuestions(item: any): void {
    this.router.navigate(['answers'], { state: { data: item } });
  }

  scoreGraphics(data: any): void {
    const questionAverages = this.calculateQuestionAverages(data);

    for (let item of questionAverages) {
      // console.log(item)

      let chartOptions = {
        series: [
          {
            name: "Puntaje",
            data: []
          }
        ],
        chart: {
          height: 350,
          type: "bar",
        },
        title: {
          text: item.evaluation.test.name,
          align: "center"
        },
        plotOptions: {
          bar: {
            columnWidth: "25%",
            // endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 2
        },
        grid: {
          row: {
            colors: ["#fff"]
          }
        },
        xaxis: {
          labels: {
            rotate: -45
          },
          categories: [],
          tickPlacement: "on"
        },
        yaxis: {
          title: {
            text: "Puntaje"
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100]
          }
        },
        questions: []
      };

      item.evaluation.answers.forEach(answer => {
        const questionId = answer.quetion.id;

        const existingQuestion = chartOptions.questions.find(q => q.id === questionId);

        if (!existingQuestion) {
          chartOptions.questions.push({
            id: questionId,
            name: answer.quetion.name
          });
        }
      });

      // console.log(chartOptions.questions)

      let categories = item.questionAverages.map(item => item.question_id)
      let dataSerie = item.questionAverages.map(item => Number(item.average).toFixed(1))

      chartOptions.xaxis.categories = categories
      chartOptions.series[0].data = dataSerie

      // console.log(chartOptions)
      this.configuration.push(chartOptions)
    }
    // console.log(this.configuration)
  }

  calculateAverage(scores: number[]): number {
    const sum = scores.reduce((acc, score) => acc + score, 0);
    return sum / scores.length;
  }

  calculateQuestionAverages(evaluations: any[]): { evaluation: any; questionAverages: any[] }[] {
    const evaluationsWithAverages: { evaluation: any; questionAverages: any[] }[] = [];

    for (const evaluation of evaluations) {
      const questionScores: Record<number, number[]> = {};

      for (const answer of evaluation.answers) {
        if (!questionScores[answer.question_id]) {
          questionScores[answer.question_id] = [];
        }
        questionScores[answer.question_id].push(answer.score);
      }

      const questionAverages: any[] = [];
      for (const questionId in questionScores) {
        const average = this.calculateAverage(questionScores[questionId]);
        questionAverages.push({ question_id: parseInt(questionId), average });
      }

      evaluationsWithAverages.push({ evaluation, questionAverages });
    }

    return evaluationsWithAverages;
  }

  openDialog(element: any): void {
    this.dialog.open(DialogInfoComponent, {
      data: { element },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }

}
