import React, { Component } from 'react';
import * as d3 from 'd3';



export default class TeamColorBars extends Component {
    constructor(props) {
        super(props);
        this.drawBars = this.drawBars.bind(this);
    }

    componentDidMount(props) {
        //console.log(this.props);
        //this.setState({colorArr: this.props.color_arr});
        this.drawBars(this.props.color_arr.hex);
    }
    
    componentWillUnmount() {
        d3.selectAll(".teamBars").remove();
    }

    drawBars(teamColors) {
        if (teamColors.length) {
            const svg = d3.select(".teamBars")
                        .append("svg")
                        .attr("class", "bar")
                        .attr("width", 200)
                        .attr("height", 200);
                        //.attr("transform", "translateX(-100px)");
            
            
            var x = d3.scaleBand()
                    .range([0, teamColors.length])
                    .padding();

            var bars = svg.selectAll('.bars')
                        .data(teamColors)
                        .enter()
                        .append("g");
            
            bars.append("rect")
                    .attr("class", "bars")
                    .attr("x", (d,i) => (i * 15) + 50)
                    .attr("y", 50)
                    .attr("width", 14)
                    .attr("height", 50)
                    .attr("fill", function(d) {
                        //console.log(d);
                        return "#"+d;
                    });
        }
    }

    render() {
        var color_style = {
            position: "absolute",
            transform: "translate(100px, -100px)"
        }
        return(<div className="teamBars" style={color_style}></div>);
    }
}