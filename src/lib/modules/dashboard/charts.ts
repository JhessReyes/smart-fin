import * as echarts from "echarts";
import _, { type List } from "lodash";

export const IncomeVsExpenses = ({ transactions }: { transactions: any[] }) => {

    // Filtra las transacciones en dos grupos: Ingresos y Gastos.
    const ingresos = _.filter(transactions, { 'category.name': 'Ingreso' });
    const gastos = _.filter(transactions, (transaction: { category: { name: string; }; }) => transaction.category.name !== 'Ingreso');

    // Calcula el saldo para cada día.
    const saldoPorDia = _.groupBy(transactions, (transaction: { date: string; }) => {
        return transaction.date.split('T')[0]; // Agrupar por el día.
    });

    console.log("AAA0", transactions);
    const balanceSeries = _.map(saldoPorDia, (transactions: any, dia: any) => {
        const saldo = _.sumBy(transactions, 'amount');
        return {
            name: "balance",
            type: "line",
            data: [{
                dia,
                saldo
            }]
        };
    });

    const ingresosSeries = {
        name: "ingresos",
        type: "line",
        data: ingresos.map((transaccion: { date: string; amount: any; }) => ({
            dia: transaccion.date.split('T')[0],
            ingreso: transaccion.amount
        }))
    };

    const gastosSeries = {
        name: "gastos",
        type: "line",
        data: gastos.map((transaccion: { date: string; amount: any; }) => ({
            dia: transaccion.date.split('T')[0],
            gasto: transaccion.amount
        }))
    };

    console.log(ingresosSeries, gastosSeries, balanceSeries);

    let option: object = {}
    option = {
        dataset: [
            {
                id: 'dataset_ingresos',
                source: ingresos, // Supongamos que 'ingresos' es un arreglo de datos con tus ingresos
            },
            {
                id: 'dataset_gastos',
                source: gastos, // Supongamos que 'gastos' es un arreglo de datos con tus gastos
            },
            {
                id: 'dataset_balance',
                source: balanceSeries, // Supongamos que 'balanceSeries' es un arreglo de datos con tu balance
            }
        ],
        title: {
            text: 'Ingresos, Gastos y Balance'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            nameLocation: 'middle',
        },
        yAxis: {
            name: 'Cantidad'
        },
        series: [
            {
                type: 'line',
                datasetId: 'dataset_ingresos',
                showSymbol: false,
                encode: {
                    x: 'dia',
                    y: 'ingreso',
                    itemName: 'dia',
                    tooltip: ['ingreso']
                }
            },
            {
                type: 'line',
                datasetId: 'dataset_gastos',
                showSymbol: false,
                encode: {
                    x: 'dia',
                    y: 'gasto',
                    itemName: 'dia',
                    tooltip: ['gasto']
                }
            },
            {
                type: 'line',
                datasetId: 'dataset_balance',
                showSymbol: false,
                encode: {
                    x: 'dia',
                    y: 'saldo',
                    itemName: 'dia',
                    tooltip: ['saldo']
                }
            }
        ]
    };
    /* option = {
        title: {
            text: 'Log Axis',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
            left: 'left'
        },
        xAxis: {
            type: 'category',
            name: 'x',
            splitLine: { show: false },
            data: ['A', 'B']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis: {
            type: 'log',
            name: 'y',
            minorSplitLine: {
                show: true
            }
        },
        series: [
            ingresosSeries,
            gastosSeries,
            balanceSeries
        ]
    }; */

    return option
}


export function incomeExpensesChart(transactions: any, opt?: any) {
    const datasetWithFilters: echarts.DatasetComponentOption[] = [];
    const seriesList: echarts.SeriesOption[] = [];

    // Filtra las transacciones en dos grupos: Ingresos y Gastos.
    const ingresos = _.filter(transactions, (transaction: { category: { name: string; }; }) => transaction.category.name === 'Ingreso');
    const gastos = _.filter(transactions, (transaction: { category: { name: string; }; }) => transaction.category.name !== 'Ingreso');

    // Calcula el saldo para cada día.
    const saldoPorDia = _.groupBy(transactions, (transaction: { date: string; }) => {
        return transaction.date.split('T')[0]; // Agrupar por el día.
    });

    const balanceSeries = _.map(saldoPorDia, (transactions: any, dia: any) => {
        const ingresos = _.filter(transactions, (transaction: { category: { name: string; }; }) => transaction.category.name === 'Ingreso');
        const gastos = _.filter(transactions, (transaction: { category: { name: string; }; }) => transaction.category.name !== 'Ingreso');

        const sumaIngresos = _.sumBy(ingresos, 'amount') || 0;
        const sumaGastos = _.sumBy(gastos, 'amount') || 0;
        const saldo = +sumaIngresos - sumaGastos
        return [
            dia,
            "SALDO",
            saldo
        ]
    });

    const ingresosSeries = ingresos.map((transaccion: { date: string; amount: any; }) => ([
        transaccion.date.split('T')[0],
        "INGRESO",
        transaccion.amount
    ]))


    const gastosSeries = gastos.map((transaccion: { date: string; amount: any; }) => ([
        transaccion.date.split('T')[0],
        "GASTO",
        transaccion.amount
    ]))

    const dataSet = [...ingresosSeries, ...gastosSeries, ...balanceSeries];

    echarts.util.each(["INGRESO", "GASTO", "SALDO"], function (type: any) {
        var datasetId = "dataset_" + type;
        datasetWithFilters.push({
            id: datasetId,
            fromDatasetId: "dataset_raw",
            transform: {
                type: "filter",
                config: {
                    and: [
                        { dimension: "type", "=": type },
                    ],
                },
            },
        });
        seriesList.push({
            type: type === 'SALDO' ? "line" : "bar",
            datasetId: datasetId,
            name: type,
            /*       endLabel: {
                      show: true,
                  }, */
            labelLayout: {
                moveOverlap: "shiftY",
            },
            emphasis: {
                focus: "series",
            },
            /* markPoint: {
                data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' }
                ]
            }, */
            markLine: {
                data: [
                    [
                        {
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'max'
                        },
                        {
                            symbol: 'circle',
                            label: {
                                position: 'insideEndTop',
                                formatter: 'Max'
                            },
                            type: 'max',
                        }
                    ]
                ]
            },
            encode: {
                x: "dia",
                y: "cantidad",
                label: ["type", "cantidad"],
                itemName: "type",
                tooltip: "cantidad",
            },
        });
    });


    let options: object
    options = {
        animationDuration: 1000,
        dataset: [
            {
                id: "dataset_raw",
                source: [
                    ["dia", "type", "cantidad"],
                    ...dataSet
                ],
            },
            ...datasetWithFilters,
        ],
        title: {
            text: "Transacciones realizadas",
            padding: 10,
            left: "center"
        },
        dataZoom: [
            {
                type: "inside",
            },
            {
                type: "slider",
            },
        ],
        tooltip: {
            order: "valueDesc",
            trigger: "axis",
        },
        xAxis: {
            type: "time",
            nameLocation: "middle",
        },
        yAxis: {
            name: "USD $",
        },
        grid: {
            right: 140,
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: false,
                },
                saveAsImage: {
                    pixelRatio: 2,
                },
            },
        },
        series: seriesList,
    };

    return options
}

export function top5Categories(transactions: {} | any, props?: any) {
    // Agrupar transacciones por categoría
    const groupByCategory = _.groupBy(transactions, 'category.name');

    // Mapear y sumar los montos por categoría
    const source = [
        ['amount', 'category'],
        ..._.map(groupByCategory, (T: List<unknown>, C: string) => [
            _.sumBy(T, 'amount'),
            C
        ])
    ];

    let options: object = {}
    options = {
        title: {
            text: "Categorias",
            padding: 10,
            left: "center"
        },
        legend: {},
        dataset: {
            source
        },
        grid: { containLabel: true },
        xAxis: {},
        yAxis: { type: 'category' },
        visualMap: {
            orient: 'horizontal',
            left: 'center',
            text: ['Alto', 'Bajo'],
            dimension: 0,
            inRange: {
                color: ['#65B581', '#FFCE34', '#FD665F']
            }
        },
        series: [
            {
                type: 'bar',
                encode: {
                    x: 'amount',
                    y: 'category'
                }
            }
        ]
    };
    return options
}