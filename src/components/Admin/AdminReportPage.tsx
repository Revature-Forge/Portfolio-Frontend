import axios from "axios";
import { useCookies } from "react-cookie";

import AdminChart from "../Admin/AdminChart";

const adminReportPage = (props: any) => {

    const reportPage = (): void => {
        let pahtname = "./admin";
        window.location.pathname = pahtname;
      }

return (
    <div>
        <div>
            Name of admin: 
        </div>
        <div>
            Average response time for the portfolios
        </div>
        <AdminChart/>
        <div> </div>
        <button className="btn btn-primary" onClick={() => reportPage()}> 
            Go Back
             </button>
    </div>
)
}
export default adminReportPage;