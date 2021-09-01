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
    denied:number,
    responseTime: number,
    responseTimeString: string
  }

type Props = {
    listOfAdmins:data[]
}

const StackedBarChart:React.FC<Props> = (props) =>{

    return(
        <>

            <div> 
                {props.listOfAdmins.map((admin) => {
                    <div>
                        test
                        <h1>Test23222</h1>
                        {admin.responseTime}
                    </div>
                })} 
            </div>
            <ResponsiveContainer width="100%" height="100%">
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
            </ResponsiveContainer>
        </>
    )
}

export default StackedBarChart;