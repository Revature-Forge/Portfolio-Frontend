import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import axios from 'axios';
import { chartUrl } from './api/api';
import AdminChart from './components/Admin/AdminChart';

function App() {

  type data = {
    name:string,
    approved:number,
    denied:number
  }

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
    return <AdminChart listOfAdmins = {adminData}/>
  }else{
    getAdminData();
  }
}

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <CookiesProvider>
          <Layout />
        </CookiesProvider>
      </BrowserRouter>
      {displayComponent()}
    </>
  );
}

export default App;