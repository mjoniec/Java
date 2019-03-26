import { Component } from '@angular/core';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    source: any =
        {
            datatype: 'csv',
            datafields: [
                { name: 'Date' },
                { name: 'Open' },
                { name: 'High' },
                { name: 'Low' },
                { name: 'Close' },
                { name: 'Volume' },
                { name: 'AdjClose' }
            ],
            url: '../assets/TSLA_stockprice.csv'
        };
    getWidth(): any {
        if (document.body.offsetWidth < 850) {
            return '90%';
        }

        return 850;
    }

    dataAdapter: any = new jqx.dataAdapter(this.source, { async: false, autoBind: true, loadError: (xhr: any, status: any, error: any) => { alert('Error loading "' + this.source.url + '" : ' + error); } });
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
            minValue: new Date(2012, 0, 1),
            maxValue: new Date(2013, 11, 31),
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
                dataField: 'Close',
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
                    { dataField: 'Close', displayText: 'Close Price', lineWidth: 1, lineWidthSelected: 1 }
                ]
            }
        ];
    chartChange(event: any) {
        let args = event.args;
        args.instance.description = args.minValue.getFullYear() + " - " + args.maxValue.getFullYear();
    }
}

//import { Component } from '@angular/core';

//@Component({
//  selector: 'app-root',
//  templateUrl: './app.component.html',
//  styleUrls: ['./app.component.css']
//})


//export class AppComponent {
//  source: any =
//    {
//      datatype: 'xml',
//      datafields: [
//        { name: 'ProductName', type: 'string' },
//        { name: 'QuantityPerUnit', type: 'int' },
//        { name: 'UnitPrice', type: 'float' },
//        { name: 'UnitsInStock', type: 'float' },
//        { name: 'Discontinued', type: 'bool' }
//      ],
//      root: 'Products',
//      record: 'Product',
//      id: 'ProductID',
//      url: '../assets/products.xml'
//    };

//  dataAdapter: any = new jqx.dataAdapter(this.source);

//  cellsrenderer = (row: number, columnfield: string, value: string | number, defaulthtml: string, columnproperties: any, rowdata: any): string => {
//    if (value < 20) {
//      return `<span style='margin: 4px; float:${columnproperties.cellsalign}; color: #ff0000;'>${value}</span>`;
//    }
//    else {
//      return `<span style='margin: 4px; float:${columnproperties.cellsalign}; color: #008000;'>${value}</span>`;
//    }
//  };

//  columns: any[] =
//    [
//      { text: 'Product Name', columngroup: 'ProductDetails', datafield: 'ProductName', width: 250 },
//      { text: 'Quantity per Unit', columngroup: 'ProductDetails', datafield: 'QuantityPerUnit', cellsalign: 'right', align: 'right' },
//      { text: 'Unit Price', columngroup: 'ProductDetails', datafield: 'UnitPrice', align: 'right', cellsalign: 'right', cellsformat: 'c2' },
//      { text: 'Units In Stock', datafield: 'UnitsInStock', cellsalign: 'right', cellsrenderer: this.cellsrenderer, width: 100 },
//      { text: 'Discontinued', columntype: 'checkbox', datafield: 'Discontinued', align: 'center' }
//    ];

//  columngroups: any[] =
//    [
//      { text: 'Product Details', align: 'center', name: 'ProductDetails' }
//    ];
//}
