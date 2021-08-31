import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { chartUrl } from "../../api/api";
import StackedBarChart, { data } from "./StackedBarChart";


const AdminChart:React.FC<unknown> = () => {

    const [adminData, setList] = useState(Array<data>())
    const [gettingAdminData, setGettingAdminData] = useState(false);
    const [displayData, setDisplay] = useState(false);

    //Get all of the relevant admin data from the backend API
    //Store this data in adminData 
    //Once stored, give the all clear to display the chart by setting displayData to true
    async function getAdminData() {
        console.log("getting Admin Data for Bar Chart")
        
        await axios.post(`${chartUrl}`).then( ({data}) => {
            setList(data)
        })
        console.log("Obtained Admin data for Bar Chart");

        
        console.log("Admin Chart can now display component at will")
        setDisplay(true);
    }

    useEffect(() => {
        if(!gettingAdminData && !displayData){
            setGettingAdminData(true);
            getAdminData();
        }
    })

    //Prevents StackedBarChart from rendering an empty bar chart and not rerendering once the data is obtained.
    //Only send the component StackedBarChart once there is data in the state.
    function displayComponent(){
        getAdminData();
        console.log("Should I display the Bar Chart? " + (displayData ? "Yes, I have data." : "No, I do not have any data yet"))
        if(displayData){
            return <StackedBarChart listOfAdmins = {adminData}/>
        }
    }

    return (
        <div style = {{'height':300}}>
            {displayComponent()}
        </div>
    );
}

export default AdminChart;