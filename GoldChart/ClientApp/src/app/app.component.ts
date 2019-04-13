import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent {
    _goldData: string;
    _data = { "goldData": [{ "Date": "1971-4-1", "Open": 15.89 }, { "Date": "2019-4-5", "Open": 25.73 }] };

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        http.get<string>(baseUrl + 'api/GoldData/GoldDaily').subscribe(result => {
            this._goldData = result;
            console.log("gold data source assigned to chart");
        }, error => console.error(error));
    }

    source: any =
        {
            datatype: 'json',
            datafields: [
                { name: 'Date' },
                { name: 'Open' }
            ],
            localdata: null
        };
    getWidth(): any {
        if (document.body.offsetWidth < 850) {
            return '90%';
        }

        return 850;
    }

    dataAdapter: any = new jqx.dataAdapter(this.source, {
        loadComplete: function () {
        },
        async: true,
        autoBind: true,
        loadError: (xhr: any, status: any, error: any) =>
        { alert('Error loading "' + this.source.url + '" : ' + error); }

    });
    months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    toolTipCustomFormatFn: any = (value: any, itemIndex: any, serie: any, group: any, categoryValue: any, categoryAxis: any): any => {
        let dataItem = this.dataAdapter.records[itemIndex];
        return '<DIV style="text-align:left"><b>Date: ' +
            categoryValue.getDate() + '-' + this.months[categoryValue.getMonth()] + '-' + categoryValue.getFullYear() +
            '</b><br />Open price: $' + dataItem.Open +
            '</b><br />Close price: $' + dataItem.Close +
            '</b><br />Daily volume: ' + dataItem.Volume +
            '</DIV>';
    };
    padding: any = { left: 5, top: 5, right: 30, bottom: 5 };
    titlePadding: any = { left: 30, top: 5, right: 0, bottom: 10 };
    xAxis: any =
        {
            dataField: 'Date',
            minValue: new Date(1971, 4, 1),
            maxValue: new Date(2019, 4, 5),
            type: 'date',
            baseUnit: 'day',
            labels:
            {
                formatFunction: (value: any): any => {
                    return value.getDate() + '-' + this.months[value.getMonth()] + '\'' + value.getFullYear().toString().substring(2);
                }
            },
            rangeSelector: {
                size: 80,
                padding: { /*left: 0, right: 0,*/top: 0, bottom: 0 },
                minValue: new Date(2010, 5, 1),
                backgroundColor: 'white',
                dataField: 'Open',
                baseUnit: 'month',
                gridLines: { visible: false },
                serieType: 'area',
                labels: {
                    formatFunction: (value: any): any => {
                        return this.months[value.getMonth()] + '\'' + value.getFullYear().toString().substring(2);
                    }
                }
            }
        };
    valueAxis: any =
        {
            title: { text: 'Price per share [USD]<br><br>' },
            labels: { horizontalAlignment: 'right' }
        };
    seriesGroups =
        [
            {
                type: 'line',
                toolTipFormatFunction: this.toolTipCustomFormatFn,
                series: [
                    { dataField: 'Open', displayText: 'Open Price', lineWidth: 1, lineWidthSelected: 1 }
                ]
            }
        ];
    chartChange(event: any) {
        let args = event.args;
        args.instance.description = args.minValue.getFullYear() + " - " + args.maxValue.getFullYear();

        if (this.source.localdata == null) {
            this.source.localdata = this._goldData;
            this.dataAdapter.dataBind();
        }
    }
}