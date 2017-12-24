import { NgModule } from '@angular/core';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';

export function highchartsModules() {
    const solidgauge = require('highcharts/modules/solid-gauge.src');
    const exporting = require('highcharts/modules/exporting.src');
    const more = require('highcharts/highcharts-more.src');
    const drilldown = require('highcharts/modules/drilldown.src');
    // apply Highcharts Modules to this array
    return [ more, solidgauge, exporting, drilldown ];
}

@NgModule({
    imports: [
        ChartModule,
    ],
    exports: [
        ChartModule,
    ],
    providers: [
        { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules } // add as factory to your providers
    ]
})
export class HighchartsModule { }
