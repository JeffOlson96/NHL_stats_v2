import * as d3 from 'd3';
export default function formatData(data) {
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
                .entries(data);
    
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

    return tmpSend;
    //this.setState({formattedPlayers: tmpSend, sendPlayerData: tmpSend});
}