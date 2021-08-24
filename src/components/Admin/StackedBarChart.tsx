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
            <Bar dataKey="approved" stackId="a" fill="#474C55" />
            <Bar dataKey="denied" stackId="a" fill="#F26925" radius={[10, 10, 0, 0]}/>
            
            </BarChart>
    </div>
    )
}

export default StackedBarChart;