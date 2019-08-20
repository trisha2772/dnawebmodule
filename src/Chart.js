import React, {Component} from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2';


class Chart extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      chartData: props.chartData
    }
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: false,
    legendPosition: 'right',
    chartData: {},
    title: "Data",
    yAxes: "GC Content"
  }

  render(){
    return (
      <div>
      <Line
          height = {35}
          width = {50}
          data={this.props.chartData}
          options={{
            maintainAspectRatio: true,
            title: {
              display: this.props.displayTitle,
              text: this.props.title,
              fontSize: 25,
            fontColor: "#86878f"},

              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition
              },

              scales: {
        xAxes: [ {
         display: true,
         gridLines: {color: "#86878f" },
         ticks: {
                  fontColor: "#86878f"},
          scaleLabel: {
            display: true,
            labelString: 'DNA Strand length',
            fontSize: 18,
            fontColor: '#86878f'
          }
        } ],
        yAxes: [ {
          display: true,
          gridLines: {color: "#86878f" },
          ticks: {
                   fontColor: "#86878f"},
          scaleLabel: {
            display: true,
            labelString: this.props.yAxes,
            fontSize: 18,
            fontColor: '#86878f'

          }
        } ]
      }}}/>
      </div>
    )
  }





}

export default Chart;
