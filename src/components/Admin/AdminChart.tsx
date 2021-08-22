import axios from "axios";
import React, { useState } from "react";
import { chartUrl } from "../../api/api";
import StackedBarChart, { data } from "./StackedBarChart";


const AdminChart:React.FC<unknown> = () => {

    const [adminData, setList] = useState(Array<data>())
    const [displayData, setDisplay] = useState(false);

    async function getAdminData() {
        console.log('before')
        console.log(adminData);
        console.log(adminData.length)
        
        await axios.post(`${chartUrl}`).then( ({data}) => {
            let tempData:data[] = adminData;
            
            for(let i = 0; i < data.length; i++){
                tempData.push(data[i])
            }
            
            setList(tempData)
        })

        console.log('after')
        console.log(adminData);

        setDisplay(true);
    }

    function displayComponent(){
        console.log("display function? " + displayData)
        if(displayData){
            return <StackedBarChart listOfAdmins = {adminData}/>
        }else{
            getAdminData();
        }
    }

    return (
        <div>
            {displayComponent()}
        </div>
    );
}

export default AdminChart;