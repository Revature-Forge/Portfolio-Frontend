import React from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from "recharts";
  
export type data = {
    name:string,
    approved:number,
    denied:number
  }

type Props = {
    listOfAdmins:data[]
}

const StackedBarChart:React.FC<Props> = (props) =>{

    return(
        <ResponsiveContainer width="50%" height="100%">
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
    </ResponsiveContainer>
    )
}

export default StackedBarChart;