import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from  './Chart';


class App extends React.Component{

  constructor(){
    super()
    this.state =
    {
      text: '',
      dna: '',
      chartData: {gcContent: {}, info: {}, ext: {}}
    }

    this.handleChange = this.handleChange.bind(this)
    this.text2DNA = this.text2DNA.bind(this)
    this.gcContent = this.gcContent.bind(this)
    this.getChartData = this.getChartData.bind(this)




  }

  componentWillMount(){
    this.getChartData();
  }


  getChartData(chart){
        this.setState(
      {
          chartData: {
            gcContent: {
              labels: [],
              datasets: [
                {
                  label: 'Population',
                  data: [],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.6)'
                  ]
                }
              ]},
          info: {
            labels: [],
            datasets: [
              {
                label: 'Population',
                data: [],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)'
                ]
              }
            ]

          },

          ext: {
            labels: [],
            datasets: [
              {
                label: 'Population',
                data: [],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)'
                ]
              }
            ]

          }

        }



    }
    )
  }

  getExtensionLengths(dnaSequence){
        var extLenDict = {
        "G": {"A": 4, "C": 2 , "T": 2, },
        "A": {"G": 5 , "C": 3, "T": 3 },
        "C": {"T": 4, "G": 6 , "A": 11},
        "T": {"C": 2, "A": 3 , "G": 4}
        }
        var extSeq = ""
        var count = 0
        for (var i=0; i<dnaSequence.length; i++){
          var s = dnaSequence[i]
            if (!extSeq){
                extSeq += s.repeat(extLenDict["G"][s])
                count += extLenDict["G"][(s)]}
            else{
                 var nextExt = extLenDict[extSeq.substr(-1)][s]
                 extSeq += s.repeat(nextExt)
                 count += nextExt
               }}
        console.log(extSeq)

        return extSeq
      }

getInfoExt(text){
  var bits = this.getBits(text)
  var dna = this.text2DNA(text)
  var extDna = this.getExtensionLengths(dna)
  return bits.length/extDna.length
}



  text2DNA(text){
    //get trinary
    var ternary = ""
    for (var i = 0; i < text.length; i++){
      //get binary
      var num = text[i].charCodeAt(0).toString(3)
      ternary += num
    }

    var dnaSequence = ""
    var modDict = {
      "G": {0: "A", 1: "T", 2: "C"},
      "A": {0: "G", 1: "C", 2: "T"},
      "C": {0: "T", 1: "G", 2: "A"},
      "T": {0: "C", 1: "A", 2: "G"}
      }

      for (var i = 0; i < ternary.length; i++){
        if (!dnaSequence){
          dnaSequence += modDict["G"][ternary[i]]

        }
        else {
          dnaSequence += modDict[dnaSequence.slice(-1)][ternary[i]]
        }
      }

      return dnaSequence

  }

  handleChange(e){

    if (!this.state.text){
      this.state.chartData.gcContent.labels = [];
      this.state.chartData.gcContent.datasets[0].data = [];
      this.state.chartData.info.labels = [];
      this.state.chartData.info.datasets[0].data = [];
      this.state.chartData.ext.labels = [];
      this.state.chartData.ext.datasets[0].data = [];
    }

    console.log(this.state.text)
    this.setState({text: e.target.value}, () => this.setState({chartData: {
      gcContent: {
      labels: this.state.chartData.gcContent.labels.concat([this.state.dna.length]),
      datasets: [
        {
          label: 'Population',
          data: this.state.chartData.gcContent.datasets[0].data.concat([this.gcContent(this.state.dna)]),
          backgroundColor: [
            'rgba(50, 69, 140, 0.6)'
          ]
        }
      ]


},
      info: {
      labels: this.state.chartData.info.labels.concat([this.state.dna.length]),
      datasets: [
        {
          label: 'Population',
          data: this.state.chartData.info.datasets[0].data.concat([this.infoIndex(this.state.text)]),
          backgroundColor: [
            'rgba(206, 55, 60, 0.6)'
          ]
        }
      ]


},
ext: {
labels: this.state.chartData.ext.labels.concat([this.state.dna.length]),
datasets: [
  {
    label: 'Population',
    data: this.state.chartData.ext.datasets[0].data.concat([this.getInfoExt(this.state.text)]),
    backgroundColor: [
      'rgba(125, 147, 13, 0.6)'
    ]
  }
]


}


}}))

this.setState({dna: this.text2DNA(e.target.value)})
}


  gcContent(dnaSequence){
    var gc = 0
    for (var i=0; i < dnaSequence.length; i++){
      if (dnaSequence[i] == "G" || dnaSequence[i] == "C"){
        gc += 1;
      }
    }

  return gc/(dnaSequence.length)

  }

  getBits(text) {
    var bits = ""
    for (var i = 0; i < text.length; i ++) {
      var num = text.charCodeAt(i).toString(2)
      bits += num
    }
    return bits

  }

  infoIndex(text) {
    var dna = this.text2DNA(text);
    var bits = this.getBits(text);
    console.log(text)
    console.log(dna)
    console.log(bits)
    console.log(bits.length/dna.length)
    return (bits.length)/(dna.length)
    }


  totalNucleotides(dnaSequence)
{
  return dnaSequence.length
}

  render(){
    return (
      <div
      className = "App">
      <h1 className = "title"> DNA Data Storage </h1>
      <input
        className = "input"
        type="text"
        onChange = {this.handleChange}
        value = {this.state.text}/>
        <p className = "dna"> {this.state.dna} </p>
        <h1 className = "text"> Strand Analysis </h1>
        <div className = "firstChart">
        <Chart title="GC Content" chartData = {this.state.chartData.gcContent} redraw={true}/>
        </div>
        <div className = "firstChart">
        <Chart title="Template Strand Information Index" yAxes = 'bits/nt' chartData = {this.state.chartData.info} redraw={true}/>
        </div>
        <div className = "firstChart">
        <Chart title="Extension Length  Information Index" yAxes = 'bits/nt' chartData = {this.state.chartData.ext} redraw={true}/>
        </div>

        </div>


    )
  }
}

export default App;
