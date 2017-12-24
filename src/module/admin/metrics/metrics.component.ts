import { ManagementService } from './../../services/management.service';
import { TranslateService } from '@ngx-translate/core';
import { TableColumn, TableSortAction } from './../../components/table/table';
import { Page, Sort } from './../../services/pagination';
import { merge } from 'rxjs/observable/merge';
import { Component, OnInit, TemplateRef, ViewChild, EventEmitter } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as _ from 'lodash';

@Component({
    selector: 'ino-admin-metrics',
    templateUrl: 'metrics.component.html',
    styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {
    public loading = false;
    public columns: TableColumn[];
    public timers: any[];
    public page: Page;
    public pageSize = 25;

    public memoryChart: Chart;
    public threadsChart: Chart;
    public requestChart: Chart;

    @ViewChild('numberTemplate') private numberTemplate: TemplateRef<any>;
    private metrics: any;
    constructor(
        private managementService: ManagementService, private translateService: TranslateService) {
    }

    public ngOnInit() {
        this.columns = [
            {
                name: 'metrics.fields.name', key: 'name', type: 'string', show: true,
                minWidth: '15rem', fontWeight: '500', autogrow: true, sortable: true
            },
            {
                name: 'metrics.fields.count', key: 'count', type: 'string', show: true,
                minWidth: '5rem', sortable: true
            },
            {
                name: 'metrics.fields.mean', key: 'mean', type: 'string', show: true,
                minWidth: '5rem', template: this.numberTemplate, sortable: true
            },
            {
                name: 'metrics.fields.min', key: 'min', type: 'string', show: true,
                minWidth: '5rem', template: this.numberTemplate, sortable: true
            },
            {
                name: 'metrics.fields.p50', key: 'p50', type: 'string', show: true,
                minWidth: '5rem', template: this.numberTemplate, sortable: true
            },
            {
                name: 'metrics.fields.p75', key: 'p75', type: 'string', show: true,
                minWidth: '5rem', template: this.numberTemplate, sortable: true
            },
            {
                name: 'metrics.fields.p95', key: 'p95', type: 'string', show: true,
                minWidth: '5rem', template: this.numberTemplate, sortable: true
            },
            {
                name: 'metrics.fields.p99', key: 'p99', type: 'string', show: true,
                minWidth: '5rem', template: this.numberTemplate, sortable: true
            },
            {
                name: 'metrics.fields.max', key: 'max', type: 'string', show: true,
                minWidth: '5rem', template: this.numberTemplate, sortable: true
            },
        ];
        this.loadMetrics();
        this.translateService.onLangChange.subscribe((event: any) => {
            this.memoryChart = this.initMemoryGauge();
            this.threadsChart = this.initThreadsChart();
            this.requestChart = this.initRequestsChart();
        });
    }

    public sortPage(sortAction: TableSortAction) {
        if (sortAction.key !== '') {
            this.timers = _.orderBy(this.timers, [sortAction.key], [sortAction.type]);
        } else {
            this.timers = _.orderBy(this.timers, ['name'], ['asc']);
        }
    }

    public loadMetrics() {
        this.managementService.getMetrics().subscribe((result) => {
            this.metrics = result.body;
            this.timers = _.map(this.metrics.timers, (value, prop) => {
                return _.merge(value, { name: prop });
            });
            this.memoryChart = this.initMemoryGauge();
            this.threadsChart = this.initThreadsChart();
            this.requestChart = this.initRequestsChart();
        });
    }

    private initMemoryGauge(): Chart {
        const chartTitle = this.translateService.instant('metrics.chart.memory.title');
        const usedNHMem = Number((this.metrics.gauges['jvm.memory.non-heap.used'].value / 1000000).toFixed(0));
        const maxNHMem = Number((this.metrics.gauges['jvm.memory.non-heap.committed'].value / 1000000).toFixed(0));
        const usedHMem = Number((this.metrics.gauges['jvm.memory.heap.used'].value / 1000000).toFixed(0));
        const maxHMem = Number((this.metrics.gauges['jvm.memory.heap.max'].value / 1000000).toFixed(0));
        const usedTMem = Number((this.metrics.gauges['jvm.memory.total.used'].value / 1000000).toFixed(0));
        const maxTMem = Number((this.metrics.gauges['jvm.memory.total.max'].value / 1000000).toFixed(0));
        const chartOptions = this.initSemiPieOptions();
        return new Chart(_.merge(chartOptions, {
            title: {
                text: chartTitle,
            },
            series: [
                {
                    name: 'Total Memory',
                    data: [{
                        y: usedTMem,
                        innerRadius: '100%',
                        radius: '60%',
                        color: '#46B6B3',
                        drilldown: 'Used Memory',
                        name: this.translateService.instant('metrics.chart.memory.used')
                    },
                    {
                        y: maxTMem - usedTMem,
                        innerRadius: '100%',
                        radius: '60%',
                        color: '#eeeeee',
                        name: this.translateService.instant('metrics.chart.memory.unused')
                    }],
                }
            ],
            drilldown: {
                series: [
                    {
                        id: 'Used Memory',
                        innerSize: '50%',
                        data: [{
                            y: usedNHMem + usedHMem,
                            innerRadius: '100%',
                            radius: '60%',
                            color: '#F7981C',
                            name: this.translateService.instant('metrics.chart.memory.heap')
                        },
                        {
                            y: usedNHMem,
                            innerRadius: '100%',
                            radius: '60%',
                            color: '#1692c3',
                            name: this.translateService.instant('metrics.chart.memory.nonheap')
                        }],
                    }
                ]
            }
        }));
    }

    private initThreadsChart(): Chart {
        const threadCount = this.metrics.gauges['jvm.threads.count'].value;
        const runnableThreadCount = this.metrics.gauges['jvm.threads.runnable.count'].value;
        const timedWaitingThreadCount = this.metrics.gauges['jvm.threads.timed_waiting.count'].value;
        const waitingThreadCount = this.metrics.gauges['jvm.threads.waiting.count'].value;
        const blockedThreadCount = this.metrics.gauges['jvm.threads.blocked.count'].value;
        const chartOptions = this.initSemiPieOptions();
        const chartTitle = this.translateService.instant('metrics.chart.threads.title');
        return new Chart(_.merge(chartOptions, {
            title: {
                text: chartTitle,
            },
            series: [
                {
                    name: 'Total Threads',
                    data: [{
                        y: runnableThreadCount,
                        innerRadius: '100%',
                        radius: '60%',
                        color: '#46B6B3',
                        name: this.translateService.instant('metrics.chart.threads.runnable')
                    },
                    {
                        y: timedWaitingThreadCount,
                        innerRadius: '100%',
                        radius: '60%',
                        color: '#2299F1',
                        name: this.translateService.instant('metrics.chart.threads.timed')
                    },
                    {
                        y: waitingThreadCount,
                        innerRadius: '100%',
                        radius: '60%',
                        color: '#F7981C',
                        name: this.translateService.instant('metrics.chart.threads.waiting')
                    },
                    {
                        y: blockedThreadCount,
                        innerRadius: '100%',
                        radius: '60%',
                        color: '#F85359',
                        name: this.translateService.instant('metrics.chart.threads.blocked')
                    }]
                }
            ],
            tooltip: {
                pointFormat: '<b>{point.y} threads</b>'
            },
            plotOptions: {
                pie: {
                    showInLegend: true
                }
            }
        }));
    }

    private initRequestsChart(): Chart {
        const okCount = this.metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok'].count;
        const notFoundCount = this.metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound'].count;
        const serverErrorCount = this.metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError'].count;
        const chartOptions = this.initSemiPieOptions();
        const chartTitle = this.translateService.instant('metrics.chart.requests.title');
        return new Chart(_.merge(chartOptions, {
            title: {
                text: chartTitle,
            },
            series: [
                {
                    name: 'Total Threads',
                    data: [{
                        y: okCount,
                        innerRadius: '100%',
                        radius: '60%',
                        color: '#46B6B3',
                        name: this.translateService.instant('metrics.chart.requests.ok')
                    },
                    {
                        y: notFoundCount,
                        innerRadius: '100%',
                        radius: '60%',
                        color: '#F7981C',
                        name: this.translateService.instant('metrics.chart.requests.notfound')
                    },
                    {
                        y: serverErrorCount,
                        innerRadius: '100%',
                        radius: '60%',
                        color: '#F85359',
                        name: this.translateService.instant('metrics.chart.requests.servererror')
                    }]
                }
            ],
            tooltip: {
                pointFormat: '<b>' + this.translateService.instant('metrics.chart.requests.tooltip', { value: '{point.y}' }) + '</b>'
            },
            plotOptions: {
                pie: {
                    showInLegend: true
                }
            }
        }));
    }

    private initSemiPieOptions(): any {
        return {
            chart: {
                type: 'pie',
                spacingBottom: 15,
                spacingTop: 5
            },
            exporting: {
                enabled: false,
            },
            credits: {
                enabled: false
            },
            title: {
                verticalAlign: 'bottom',
                floating: true,
                y: 8,
                style: {
                    fontSize: '14px'
                },
            },
            legend: {
                enabled: true,
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                floating: true,
            },
            drilldown: {
                activeDataLabelStyle: {
                    textDecoration: 'none',
                    color: '#000',
                    fontWeight: '300',
                    fontSize: '10px',
                },
                drillUpButton: {
                    position: {
                        align: 'right',
                        verticalAlign: 'top',
                        x: 0,
                        y: 0
                    }
                },
            },
            tooltip: {
                pointFormat: '<b>{point.y} MB</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '110%'],
                    size: '220%',
                    dataLabels: {
                        enabled: true,
                        distance: -25,
                        formatter() {
                            const point: any = this;
                            if (point.y !== 0) {
                                return Number(point.percentage).toFixed(0) + '%';
                            }
                        },
                        style: {
                            fontWeight: '300',
                            fontSize: '10px',
                            color: 'black',
                            textOutline: '0px'
                        }
                    },
                    showInLegend: true
                }
            }
        };
    }
}
