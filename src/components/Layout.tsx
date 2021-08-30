import React from "react";
import { Route} from "react-router-dom";
import Landing from './Landing';
import ViewPortfolio from './ViewPortfolio/ViewPortfolio';
import EditEmpPortfolio from './Portfolio/PortfolioEdit/EditEmpPortfolio';
import PortfolioList from "./Portfolio/PortfolioList/PortfolioList";
import Adminpage from "./Admin/Adminpage";
import Portfoliodetails from "./Portfolio/Portfoliodetails";
import AdminReportPage from "./Admin/AdminReportPage";

function Layout() {
    return (
        <div>
          <Route exact path="/" component={Landing} />
          <Route path="/main" component={Landing} />
          <Route path="/portfolio" component={EditEmpPortfolio} />
          <Route path="/view" component={ViewPortfolio} />
          <Route path="/list" component={PortfolioList} />
          <Route path="/admin" component={Adminpage} />
          <Route path="/portfoliodetails" component={Portfoliodetails} />
          <Route path="/AdminReportPage" component={AdminReportPage} />
 
        </div>
          
    );
}

export default Layout;
