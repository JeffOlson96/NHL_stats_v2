import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import TeamColorBars from '../style_comps/TeamColorBars';



export default class PlayerPopUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
			playerData: null,
			teamColors: null,
			background_style: null
        };

    }

    componentDidMount() {
        this.setState({playerData: this.props.data, teamColors: this.props.colors, background_style: { backgroundColor: "#" + this.props.colors.hex[0], opacity: "0.5" }});
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState((props) => ({playerData: this.props.data, teamColors: this.props.colors.hex, background_style: { backgroundColor: "#" + this.props.colors.hex[0], opacity: "0.5" }}));
        }
    }
    
    render() {
		var headerStyle = {
			fontSize: "75%",
			color: "black"
		};
		console.log(this.state);
		/*
		var background_style = {
			backgroundColor: this.state.teamColors[0]
		}
		*/
        //console.log(this.state);
        return(
            <div>
				{this.state.playerData ?
					<div id="player" className='col-3'> 
						<h3 style={headerStyle}>{this.state.playerData.data.H_Ref_Name}</h3>
						<h4 style={headerStyle}>{this.state.playerData.data.Team}</h4>
						<h5 style={headerStyle}>{this.state.playerData.data.Position}</h5>
						<TeamColorBars color_arr={this.state.teamColors}/>
						<Table bordered hover size="sm" variant="dark">
							<thead>
								<tr>
									<th>GP</th>
									<th>Goals</th>
									<th>Assists</th>
									<th>Points</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th style={{color: "white"}}>{this.state.playerData.data.GP}</th>
									<th style={{color: "white"}}>{this.state.playerData.data.G}</th>
									<th style={{color: "white"}}>{this.state.playerData.data.A}</th>
									<th style={{color: "white"}}>{this.state.playerData.data.PTS}</th>
								</tr>
							</tbody>
						</Table>
					</div>
					: null
				}
			</div>
        );
    }
}