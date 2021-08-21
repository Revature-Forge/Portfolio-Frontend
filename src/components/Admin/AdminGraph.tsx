import React, { useEffect, useState } from 'react';
import axios from "axios";
import { chartUrl } from "../../api/api";

type data = {
    name:string,
    approved:number,
    denied:number
}

type Props = {
    listOfAdmins:Array<data>
}

const AdminGraph: React.FC<Props> = (props) => {

    function test(){
        console.log('made it')
    }
    

    return (
    <div>
        {test()}
        hello {props.listOfAdmins[0].name}
    </div>);
}

export default AdminGraph;