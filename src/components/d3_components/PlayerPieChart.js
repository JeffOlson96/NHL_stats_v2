import React, { Component } from "react";
import * as d3 from "d3";
import teamColors from "../../helpers/teamColors.json";
import { color } from "d3";
const fs = require('fs');


export default class PlayerPieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rawData: null,
            usedData: null,
            clicked: null,
            depth: 0
        };
        
        this.drawChart = this.drawChart.bind(this);

    }


    componentDidMount() {
		//console.log(JSON.stringify(this.props.data));
		//const path = "../../staticData/output.json";
		//fs.writeFile(path, JSON.stringify(JSON.parse(this.props.data)));
      	this.setState((props) => ({rawData: this.props.data}));
    	this.drawChart(this.props.data);
    }

		
    componentDidUpdate(prevProps) {
		// this is only for when we have change in data ie
		// make sure this is correct because if setState is wrong (like the attr your updating is spelled wrong)
		// it will continuously re render the same component over and over, which is annoying
			if (prevProps.data !== this.props.data) {
				this.setState((props) => ({rawData: this.props.data}));
				d3.selectAll(".playerpie").remove();
				this.drawChart(this.props.data);
				//d3 remove
				//drawChart again
			}
		}
		
    
		componentWillUnmount() {
			d3.selectAll(".playerpie").remove();
		}
		
    drawChart(data) {

			var scope = this;

			var radius = 200;
			var colorSet = [];

			teamColors.forEach((team) => {
					// format hex colors to push into colorSet array so you can use later when drawing on svg
					var tmpColor = "#" + team.colors.hex[team.colors.hex.length-1];

					colorSet.push(tmpColor);
			});


			var color = d3.scaleOrdinal().domain(data).range(d3.schemeSet3);
			// create arc for pie/donut chart
			var arc = d3.arc().outerRadius(radius-10).innerRadius(radius-100);
			
			var pie = d3.pie()
							.sort(null)
							.value(function(d) {
								// logic for data drilling
								if (d.value) {
									return d.value;
								}
								else if (d.G) {
									return d.G;
								}
							});
			
			const svg = d3.select("#playerpie")
										.append("svg")
										.attr("class", "playerpie")
										.attr("width", 600)
										.attr("height", 500)
										.attr("style", "position:absolute")
										.append("g")
										.attr("transform", "translate(300,240)");
			
			svg.append("text")
					.style("text-anchor", "middle")
					.text("return")
					.on("click", function(d) {
						if (scope.state.clicked && scope.state.depth > 0) {
							d3.select("svg").remove();
							scope.props.onBackClick(scope.state.clicked.data.parent);
							scope.setState({depth: scope.state.depth-=1});
						}
					})
					.attr("transform", "translate(0,10)");
				
			var g = svg.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");

			g.append("path")
				.attr("d", arc)
				.style("fill", function(d) {
					//console.log(d);
					if(d.data.key) {
						return color(d.data.key);
					}
					else if (d.data.H_Ref_Name) {
						return color(d.data.H_Ref_Name);
					}
				})
				.on("click", function(d) {
					scope.props.onDrillDown(d);
					scope.setState({clicked: d, depth: scope.state.depth+=1});
					if (d.data.roster) {
						d3.selectAll(".playerpie").remove();
						scope.drawChart(d.data.roster);
					}
				})
				.on("mouseover", function(d) {
					d3.select(this).style("opacity", 0.5);
					g.append("text")
						.attr("class", "val")
						.attr("transform", function() {
							let coord = arc.centroid(d);
							coord[0] *= 0.9;
							coord[1] *= 0.9;
							return "translate(" + coord + ")";
						})
						.text(function() {
							if (d.data.value) {
								return Math.ceil(d.data.value) + " Goals";
							}
							else if (d.data.G) {
								return Math.ceil(d.data.G) + " Goals";
							}
						})
						.attr("font-size", "8px")
						.style("text-anchor", "middle")
						.style("font-weight", "lighter");
				})
				.on("mouseout", function(d,i) {
					d3.select(this).style("opacity", 1);
					d3.selectAll(".val").remove();
				});
							
			g.append("text")
				.attr("transform", function(d,i) {
					let coord = arc.centroid(d);
					// stretch text a little further out
					coord[0] *= 1.5;
					coord[1] *= 1.5;
					return "translate(" + coord + ")";
				})
				.attr("dy", ".35em")
				.style("text-anchor", "middle")
				.text(function(d) {
					if (d.data.key) {
						//console.log("always?")
						if (d.data.G >= 5) {
							return d.data.key;
						}
						else if (d.data.value) {
							return d.data.key;
						}
					}
				})
				.attr("font-size", "8px");
					
		}
		
		render() {
			return(<div />);
		}

}