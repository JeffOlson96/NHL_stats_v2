import React, { Component } from 'react';
import TeamLogo from '../images/TeamLogo.png';



export default class Header extends Component {
	render() {
		const head_style = {
			height: "70px",
			textAlign: "center",
			fontFize: "15px",
			color: "black",
			background: "#4284f5",
			fontFamily: "Lucida Console",
			backgroundImage: `url(${TeamLogo})`,
			backgroundSize: "15%",
			backgroundRepeat: "no-repeat"
		};
		return(
			<div id="head" style={head_style}>
				<h4>NHL Statistics Dashboard</h4>
				<h5>created by Jeff Olson</h5>
			</div>
		)
	}
}