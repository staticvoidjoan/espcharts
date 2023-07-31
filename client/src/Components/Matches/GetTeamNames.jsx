import axios from "axios";
import React, {useState, useEffect} from "react"

const ViewTeam = ({teamId}) => {
    const [team,setTeam] = useState([]);
    

    useEffect(() => {
        loadTeams();
    },[]);


    const loadTeams = async () => {
        try {
            const response = await axios.get('http://localhost:5000/espcharts/team/$(teamId)');
            setTeam(response.data);
        } catch (error) {
            console.error(error);

            
        }
    }


    return(
        <>
        {team.teamName}</>
    )
}

export default ViewTeam;