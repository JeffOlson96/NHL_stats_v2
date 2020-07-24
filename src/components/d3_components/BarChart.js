import React, { Component } from "react";
import * as d3 from "d3";
import findAverage from '../../helpers/findAverage';

export default class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      send: null,
      clicked: null,
      avgLeagueGoals: 0
    };

    this.drawChart = this.drawChart.bind(this);
    //this.findAverage = this.findAverage.bind(this);
  }

  componentDidMount() {
    this.setState((props) => ({ data: this.props.data }));
    this.drawChart(this.props.data);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState((props) => ({ data: this.props.data }));
      d3.selectAll(".bar").remove();
      this.drawChart(this.props.data);
    }
  }

  drawChart(data) {
    var multiplyFactor = 1.0;

    var dataMax, dataMin;

    function findTopPlayers(team) {
      var maxAssists = 0, maxGoals = 0, maxPoints = 0;
      var playerGoals, playerAssists, playerPoints;

      if (team.roster) {
        team.roster.forEach((val, idx) => {
          if (val.G > maxGoals) {
            maxGoals = val.G;
            playerGoals = val;
          }
          if (val.A > maxAssists) {
            maxAssists = val.A;
            playerAssists = val;
          }
          if (val.PTS > maxPoints) {
            maxPoints = val.PTS;
            playerPoints = val;
          }
        });
      }
      return { G: playerGoals, A: playerAssists, P: playerPoints };
    }

    function getVals() {
      return data.map(d => {
        if (d.G) {
          return d.G;
        }
        else if (d.value) {
          return d.value;
        }
      })
    }

    function getMin() {
      return Math.min(...getVals());
    }

    function getMax() {
      return Math.max(...getVals());
    }


    dataMax = getMax();
    dataMin = getMin();



    let diff = dataMax - dataMin;

    if (diff > 2000) {
      multiplyFactor = 0.1;
    }
    else if (2000 > diff >= 100) {
      multiplyFactor = 2.0;
    }
    else if (diff <= 100) {
      multiplyFactor = 3.0;
    }

    var scope = this;
    var margin = 50;

    const svg = d3.select("#bar")
      .append("svg")
      .attr("class", "bar")
      .attr("width", 800)
      .attr("height", 800);


    var x = d3.scaleBand()
      .range([0, 1500])
      .domain(data.map(function (d) {
        if (d.key) {
          return d.key;
        }
        else if (d.H_Ref_Name) {
          return d.H_Ref_Name;
        }
      }))
      .padding(0.2);

    var color = d3.scaleOrdinal()
      .domain(data)
      .range(d3.schemeSet3);

    var y = d3.scaleLinear()
      .range([0, 800])
      .domain(data.map(function (d) {
        if (d.key) {
          return d.key;
        }
        else if (d.H_Ref_Name) {
          return d.H_Ref_Name;
        }
      }));

    var bars = svg.selectAll('.bars')
      .data(data)
      .enter()
      .append("g");

    bars.append("rect")
      .attr("class", "bars")
      .attr("x", (d, i) => (i * 15) + margin)
      .attr("y", (d, i) => {
        //console.log("d: ", d);
        if (d.value) {
          return (550 - (d.value * multiplyFactor));
        }
        else if (d.G) {
          return (550 - (d.G * (multiplyFactor * 2)));
        }
      }) // 300 is height, can be made more dynamic with variables, state to hold info
      .attr("width", 10)
      .attr("height", (d, i) => {
        if (d.value) {
          return d.value * multiplyFactor;
        }
        else if (d.G) {
          return d.G * (multiplyFactor * 2);
        }
      })
      .attr("fill", function (d) {
        //console.log(d);
        d.parent = data;
        if (d.key) {
          return color(d.key);
        }
        else if (d.H_Ref_Name) {
          return color(d.H_Ref_Name);
        }
      })
      .on("mouseover", function (d) {
        d3.select(this)
          .style("opacity", 0.5);
      })
      .on("mouseout", function (d) {
        d3.select(this)
          .style("opacity", 1.0);
        d3.select(this).style("fill", function (d) {
          if (d.key) {
            return color(d.key);
          }
          else if (d.H_Ref_Name) {
            return color(d.H_Ref_Name);
          }
        });
      })
      .on("click", function (d) {
        if (d.roster) {
          var sendDisplay = findTopPlayers(d);
          //var sendDisplay = [goalPlayer, assistPlayer, pointsPlayer];
          console.log(sendDisplay);
          scope.setState({ display: sendDisplay });
          //scope.props.onChangeValue(sendDisplay);
        }
      });

    bars.append("text")
      .attr("class", "label")
      .text((d) => {
        if (d.key) {
          return d.key;
        }
        else if (d.H_Ref_Name) {
          return d.H_Ref_Name;
        }
      })
      .attr("font-size", "8px")
      .attr("transform", (d, i) => {
        /*
        if (d.key) {
          return "translate( " + (((i * 15) + 9) + margin) + "," + (600) + ")rotate(-90)";
        }
        else if (d.H_Ref_Name) {
          return "translate( " + (((i * 15) + 9) + margin) + "," + (640) + ")rotate(-90)";
        }
        */
        // because players get assigned a key, split by length cause teams use abbreviations as keys
        if (d.key.length > 3) {
          return "translate( " + (((i * 15) + 9) + margin) + "," + (630) + ")rotate(-90)";
        }
        else {
          return "translate( " + (((i * 15) + 9) + margin) + "," + (600) + ")rotate(-90)";
        }
      });


    bars.append("text")
      .attr("class", "value")
      .text((d) => {
        if (d.value) {
          return Math.ceil(d.value);
        }
        else if (d.G) {
          return Math.ceil(d.G);
        }
      })
      .attr("x", (d, i) => ((i * 15) - 0) + margin)
      .attr("y", (d, i) => {
        if (d.value) {
          return (550 - (d.value * multiplyFactor));
        }
        else if (d.G) {
          return (550 - (d.G * (multiplyFactor * 2)));
        }
      })
      .attr("font-size", "8px");

    svg.attr("transform", "translate(-100, -200)");
    scope.setState({avgLeagueGoals: findAverage(data)});
  }
  /*
  findAverage(arr) {
    //console.log("arr: ", arr);
    var total = 0;
    var avg;
    if (arr.length) {
      arr.forEach((val) => {
        if (val.value) {
          total += val.value
        }
        else if (val.G) {
          total += Number(val.G)
        }
      });
      avg = total / arr.length;
    }
    this.setState({ avgLeagueGoals: avg });
  }
  */

  render() {
    return (
      <div id="div-avg-goals">
        <p>Average Goals</p>
        <p>{this.state.avgLeagueGoals}</p>
      </div>
    );
  }
};