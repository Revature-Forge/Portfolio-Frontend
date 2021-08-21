import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminGraph from './components/Admin/AdminGraph';
import axios from 'axios';
import { useState } from 'react';
import { chartUrl } from './api/api';

function App() {


  type data = {
    name:string,
    approved:number,
    denied:number
}

const [renders, setRenders] = useState(0);
const [adminData, setAdminData] = useState(new Array<data>());

function getData(){
    let returnString:string;
    if(renders === 0){
        setRenders(renders + 1);
        return getAdminData();
    }else{
    }
}

async function getAdminData() {
    console.log('before')
    console.log(adminData);
    console.log(adminData.length)
    
    await axios.post(`${chartUrl}`).then( ({data}) => {
        let tempData:data[] = adminData;
        
        for(let i = 0; i < data.length; i++){
            tempData.push(data[i])
        }
        
        setAdminData(tempData)
    })

    console.log('after')
    console.log(adminData);

    return <AdminGraph listOfAdmins = {adminData}/>
}

// useEffect(()=> {
//     getData();
// })


  return (
    <div className="App">
      {/* <ToastContainer />
      <BrowserRouter>
        <CookiesProvider>
          <Layout /> */}
          {getData()}
        {/* </CookiesProvider>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
