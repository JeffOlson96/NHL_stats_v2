import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import './CSS/TeamRoster.css';

export default class TeamRoster extends Component {

    constructor(props) {
			super(props);
			this.state = {
					team: null
			};
    }


    componentDidMount() {
      this.setState((props) => ({team: this.props.team}));
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
          this.setState((props) => ({team: this.props.team}));
        }
    }


    render() {
		//console.log(this.state.team);
		var tablestyle = {
			height: "200px",
			overflowY: "scroll"
		};
		if (this.state.team) {
			this.state.team.roster.sort((a,b) => {
				return b.PTS - a.PTS;
			});
		}
		return(
			<div>
				{
					this.state.team ?
						<div id="TeamRoster" className="col-3" >
							<h5>{this.state.team.TeamInfo.Teamname}</h5>
							<Table striped bordered hover variant="dark" size="sm" >
								<thead>
									<tr>
										<th>Name</th>
										<th>Position</th>
										<th>Born</th>
										<th>County</th>
										<th>GP</th>
										<th>G</th>
										<th>A</th>
										<th>Pts</th>
									</tr>
								</thead>
								<tbody>
									{
										this.state.team.roster.map((player) => {													
											return(
												<tr key={player.CorsicaID}>
													<td>{player.H_Ref_Name}</td>
													<td>{player.Position}</td>
													<td>{player.Born.substr(0, 10)}</td>
													<td>{player.Cntry}</td>
													<td>{player.GP}</td>
													<td>{player.G}</td>
													<td>{player.A}</td>
													<td>{player.PTS}</td>
												</tr>
											);													
										})
									}
								</tbody>
							</Table>
						</div>
					: "Loading..."
				}
			</div>
		);
    }



}