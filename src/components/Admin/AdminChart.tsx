import React from "react";

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
           Admin name: {props.listOfAdmins[0].name}
        </div>
    );
}

export default AdminChart;