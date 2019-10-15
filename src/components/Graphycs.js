import React from 'react';
import { Line } from 'react-chartjs-2';

class Graphycs extends React.Component {

    infoValues = () => {
        if (!this.props.values) return null;
        let values = this.props.values.Dolares.map(e => parseFloat(e.Valor));
        let prom = ((values.reduce((p, n) => p + n, 0)) / values.length);
        let max = Math.max.apply(Math, values)
        let min = Math.min.apply(Math, values)

        return {
            prom: Math.round(prom * 100) / 100,
            max: max,
            min: min
        }
    }

    getData = () => {
        if (!this.props.values) return null;
        let labels = this.props.values.Dolares.map(e => e.Fecha);
        let values = this.props.values.Dolares.map(e => parseFloat(e.Valor));

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Valor del Dolar',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: values
                }
            ]
        }
    }

    render() {
        if (!this.props.values) {
            return (
                <div className="graphycs">
                    <h1 className="msg">Debe seleccionar una fecha de inicio y una de fin para ver valores!!</h1>
                </div>
            )
        }
        if (this.props.values.Dolares.length === 1) {
            return (
                <div className="graphycs">
                    <h1 className="msg">
                        El valor del Dolar el día {this.props.values.Dolares[0].Fecha} es de:
                        <span>{this.props.values.Dolares[0].Valor} CLP</span>
                    </h1>
                </div>
            )
        }
        return (
            <div className="graphycs">
                <div className="info">
                    <div className="data">
                        <span className="title">Valor Máximo:</span> {this.infoValues().max} CLP
                    </div>
                    <div className="data">
                        <span className="title">Valor Mínimo:</span> {this.infoValues().min} CLP
                    </div>
                    <div className="data">
                        <span className="title">Valor Promedio:</span> {this.infoValues().prom} CLP
                    </div>
                </div>
                <Line data={this.getData}></Line>
            </div>
        )
    }
};

export default Graphycs;