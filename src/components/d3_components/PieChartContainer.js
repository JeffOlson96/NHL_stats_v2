import React, { Component } from 'react';
import * as d3 from 'd3';
//import resPlayers from '../../staticData/NHL2017-18_format.csv';
//import resTeam from  '../../staticData/nhl_team_data.csv';
//import teamColors from '../../staticData/teamColors.json';
import PlayerPieChart from './PlayerPieChart.js';
import PlayerPopUp from './PlayerPopUp.js';
import TeamRoster from './TeamRoster.js';
import BarChart from './BarChart.js';
import teamColors from '../../helpers/teamColors.json';



export default class PieChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playerData: null,
			teamData: null,
			formattedPlayers: null,
			formattedTeam: null,
			sendPlayerData: null,
			sendTeamData: null,
			showPopup: false,
			pop_up_Player: null,
			teamSend: null,
			data_to_present: null,
			popup_color: null
		};

		
		this.formatData = this.formatData.bind(this);
		this.formatTeamData = this.formatTeamData.bind(this);
		this.findAvgGoals = this.findAvgGoals.bind(this);
		this.onPlayerBackClick = this.onPlayerBackClick.bind(this);
		this.onPlayerDrillDown = this.onPlayerDrillDown.bind(this);
		this.handleDataChange = this.handleDataChange.bind(this);
	}

	componentDidMount() {
		// this will be fullfilled by a get request but for now d3
		//this.setState({data: resPlayers, teamData: resTeam});
		var scope = this;

		// nested fetch allows for ALL data to load before trying
		// to render
		fetch("http://desktop-hv2qoiv:3000/players")
			.then(res => {
				return res.json();
			})
			.then(body => {
				//console.log(body);
				this.setState({playerData: body.recordset});
				if (scope.state.playerData) { scope.formatData(); }
			})
			.then(() => {
				fetch("http://desktop-hv2qoiv:3000/teams")
					.then(res => {
						return res.json();
					})
					.then(body => {
						//console.log(body);
						this.setState({teamData: body.recordset});
						if (scope.state.teamData) { scope.formatTeamData(); }
					});
			})		
	}
	/*
	componentDidUpdate(prevProps) {
		// this is only for when we have change in data ie
		if (prevProps.data !== this.props.data) {
			this.setState((props) => ({data: this.props.data}));
			//d3 remove
			//drawChart again
		}
	}
	*/
	findAvgGoals(arr) {
		var total = 0;
		var avg;

		avg = arr.value/arr.roster.length;
		arr.AvgGoals = avg;
		return avg;
	}

	formatData() {
		//console.log(this.state);
		var scope = this;

		const getTeamName = (d) => {
			if (d.Team.length === 3) {
				return d.Team;
			}
			else if (d.Team.length !== 3) {
				return d.Team.substr(d.Team.length-3, d.Team.length);
			}
		}

		var totPlayers = [];

		var tmpSend = d3.nest()
					.key(function(d) {
						return getTeamName(d);
					})
					.rollup(function(d) {
						return d3.sum(d, function(v) {
							totPlayers.push(v);
							return v.G;
						})
					})
					.entries(this.state.playerData);
		
		tmpSend.forEach((d, i) => {
			d.roster = [];
			totPlayers.forEach((p, j) => {
				var baseName = getTeamName(p);
				if (baseName === d.key) {
					d.roster.push(p);
				}
				p.key = p.H_Ref_Name;
			});
		});

		this.setState({formattedPlayers: tmpSend, sendPlayerData: tmpSend});
	}

	formatTeamData() {
		//console.log(this.state);
		var scope = this;
		var tmpData = this.state.sendPlayerData;
		//if (tmpData) {
		tmpData.forEach((team) => {
			team.TeamInfo = this.state.teamData.find((d) => {
				return d.Abr === team.key;
			});
			team.colorInfo = teamColors.find((c) => {
				return c.name === team.TeamInfo.Teamname;
			});
		});
		console.log(tmpData);
		this.setState({sendPlayerData: tmpData});
		//}
	}

	onPlayerBackClick = (e) => {
		this.setState({sendPlayerData: this.state.formattedPlayers, showPopup: false, teamSend: null});
		
	};

	onPlayerDrillDown = (e) => {
		//console.log("DrillDown: ", e);
		//console.log(this.state);
		if (e.data.roster) {
			this.setState({sendPlayerData: e.data.roster, teamSend: e.data, popup_color: e.data.colorInfo.colors});
		}
		///* will use this when showing pop up player
		else if (e.data.H_Ref_Name) {
			this.setState({showPopup: true, pop_up_Player: e});
		}
	};

	handleDataChange = (e) => {
		//console.log(this.state.data_to_present);
		//console.log(e.type, e);
		if (e.target.id === "goals") {
			if (this.state.data_to_present === null) {
				this.setState({data_to_present: e.target.id});
			}
			else if (this.state.data_to_present === e.target.id) {
				this.setState({data_to_present: null});
			}
			//this.setState({data_to_present: e.target.id});
		}
		else if (e.target.id === "assists") {
			if (this.state.data_to_present === null) {
				this.setState({data_to_present: e.target.id});
			}
			else if (this.state.data_to_present === e.target.id) {
				this.setState({data_to_present: null});
			}
		}
		else if (e.target.id === "points") {
			if (this.state.data_to_present === null) {
				this.setState({data_to_present: e.target.id});
			}
			else if (this.state.data_to_present === e.target.id) {
				this.setState({data_to_present: null});
			}
		}
	};

	render() {
		// console.log(this.state.sendPlayerData);
		//console.log(this.state.data_to_present);
		var mystyle = {
			transform: `translateX(700px)`,
			zIndex: "1",
			position: "absolute"
		};

		var mystyle2 = {
			transform: `translate(100px, 500px)`,
			zIndex: "1",
			position: "absolute"
		};

		var popup_style = {
			transform: 'translate(350px, -150px)',
			position: 'absolute'
		};
		
		return(
			<div>
				<h5>Goals by Team/Player</h5>
				<p>Click to drill down and view player stats</p>
				{
					this.state.sendPlayerData ?
						<div id="playerpie">
							<div id="checkBoxes">
								<input type="checkbox" id="goals" name="goals" value="Goals" onChange={this.handleDataChange}/>
								<label htmlFor="goals"> Goals</label><br></br>
								<input type="checkbox" id="assists" name="assists" value="Assists" onChange={this.handleDataChange}/>
								<label htmlFor="assists"> Assists</label><br></br>
								<input type="checkbox" id="points" name="points" value="Points" onChange={this.handleDataChange}/>
								<label htmlFor="points"> Points</label>
							</div>
							{this.state.showPopup ?
								<div id="popup" style={popup_style}>
									<PlayerPopUp
										data={this.state.pop_up_Player}
										colors={this.state.popup_color}
									/>
								</div>
							: null
							}
							<div className="charts" style={{transform: "translateY(0px)"}}>
								<h4>Pie Chart Showing Total Team Goals</h4>
								<PlayerPieChart
									data={this.state.sendPlayerData}
									onBackClick={this.onPlayerBackClick}
									onDrillDown={this.onPlayerDrillDown}
								/>
								{this.state.teamSend ?
									<div id="roster" style={mystyle}>
										<TeamRoster
											team={this.state.teamSend}
										/>
									</div>
									: null
								}
								<div id="bar" style={mystyle2}>
									<h4>Bar Chart showing Team Total Goals</h4>
									<BarChart
										data={this.state.sendPlayerData}
									/>
								</div>
							</div>
						</div>
					: "Loading..."
				}
			</div>
		);
	}
}