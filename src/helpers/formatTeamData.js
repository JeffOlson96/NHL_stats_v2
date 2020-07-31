import teamColors from '../helpers/teamColors.json';

export default function formatTeamData(playerData, teamData) {
    var tmpData = playerData;
    
    tmpData.forEach((team) => {
        team.TeamInfo = teamData.find((d) => {
            return d.Abr === team.key;
        });
        team.colorInfo = teamColors.find((c) => {
            return c.name === team.TeamInfo.Teamname;
        });
    });
    //console.log(tmpData);
    //this.setState({sendPlayerData: tmpData});
    //}
    return tmpData
}