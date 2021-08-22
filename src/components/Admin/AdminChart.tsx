import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

type data = {
    name:string,
    approved:number,
    denied:number
  }

type Props = {
    listOfAdmins:data[]
}

const AdminChart:React.FC<Props> = (props) => {

    return (
        <div>
           <Chart listOfAdmins= {props.listOfAdmins}></Chart>
        </div>
    );
}

export default AdminChart;

const Chart:React.FC<Props> = (props) =>{

    return(
        <div>
            <BarChart
      width={500}
      height={300}
      data={props.listOfAdmins}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="approved" stackId="a" fill="#8884d8" />
      <Bar dataKey="denied" stackId="a" fill="#82ca9d" />
      
    </BarChart>
        </div>
    )
}