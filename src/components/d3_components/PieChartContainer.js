import React, { Component } from 'react';
import * as d3 from 'd3';
import PlayerPieChart from './PlayerPieChart.js';
import PlayerPopUp from './PlayerPopUp.js';
import TeamRoster from './TeamRoster.js';
import BarChart from './BarChart.js';
import teamColors from '../../helpers/teamColors.json';
import { fetchData } from "../../actions/index.js";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';





class PieChartContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playerData: null,
			teamData: null,
			formattedPlayers: null,
			sendPlayerData: null,
			sendTeamData: null,
			showPopup: false,
			pop_up_Player: null,
			teamSend: null,
			data_to_present: null,
			popup_color: null,
			currentCheck: [],
			limit: 1 // limit the number of checkboxes that user can check
		};

		
		this.formatData = this.formatData.bind(this);
		this.findAvgGoals = this.findAvgGoals.bind(this);
		this.onPlayerBackClick = this.onPlayerBackClick.bind(this);
		this.onPlayerDrillDown = this.onPlayerDrillDown.bind(this);
		this.handleDataChange = this.handleDataChange.bind(this);
	}
	

	componentDidMount() {
		// this will be fullfilled by a get request but for now d3
		//this.setState({data: resPlayers, teamData: resTeam});
		
		//const dispatch = useDispatch();
		// nested fetch allows for ALL data to load before trying
		// to render
		//console.log(this.props);
		this.props.fetchData();
	}

	
	
	componentDidUpdate(prevProps) {
		// this is only for when we have change in data ie
		//console.log(this.props);
		if ((prevProps.playerData !== this.props.playerData) || (prevProps.teamData !== this.props.teamData)) {
			
			this.setState(() => ({playerData: this.props.playerData, teamData: this.props.teamData}));
			
			if (this.props.pending === false) {
				this.formatData();
			}
		}
	}
	
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
					.entries(this.props.playerData);
		
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


		tmpSend.forEach((team) => {
			team.TeamInfo = this.props.teamData.find((d) => {
				return d.Abr === team.key;
			});
			team.colorInfo = teamColors.find((c) => {
				return c.name === team.TeamInfo.Teamname;
			});
		});



		this.setState({formattedPlayers: tmpSend, sendPlayerData: tmpSend});
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
		if (e.target.id === "goals") {
			if (this.state.data_to_present === null) {
				this.setState({data_to_present: e.target.id});
			}
			else if (this.state.data_to_present === e.target.id) {
				this.setState({data_to_present: null});
			}
			else {
				e.target.checked = false;
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
			else {
				e.target.checked = false;
			}
		}
		else if (e.target.id === "points") {
			if (this.state.data_to_present === null) {
				this.setState({data_to_present: e.target.id});
			}
			else if (this.state.data_to_present === e.target.id) {
				this.setState({data_to_present: null});
			}
			else {
				e.target.checked = false;
			}
		}
	};

	render() {
		// console.log(this.state.sendPlayerData);
		//console.log(this.state);
		//console.log(this.props);
		var roster_style = {
			transform: `translateX(700px)`,
			zIndex: "1",
			position: "absolute"
		};

		var bar_style = {
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
									<div id="roster" style={roster_style}>
										<TeamRoster
											team={this.state.teamSend}
										/>
									</div>
									: null
								}
								<div id="bar" style={bar_style}>
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


function mapStateToProps(state) {
	//console.log(state);
	return {
		playerData: state.reducer.playerData,
		teamData: state.reducer.teamData,
		pending: state.reducer.pending,
		error: state.reducer.error
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	fetchData: fetchData
}, dispatch);

export default connect(mapStateToProps, { fetchData })(PieChartContainer);