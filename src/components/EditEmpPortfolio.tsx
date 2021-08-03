import axios from "axios";
import {
    Button,
    Col,
    Container,
    OverlayTrigger,
    Popover,
    Row
} from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { portfolioUrl, url } from "../api/api";
import "../css/EditEmpPortfolio.css";
import AboutMe from "./RevatureAboutMe";
import CertificationContainer from "./CertificationContainer";
import EducationContainer from "./EducationContainer";
import HonorAwards from "./HonorAward";
import IndustryEquivalency from "./IndustryEquivalency";
import OtherWorkExperience from "./OtherWorkExperience";
import Project from "./Project";
import RevatureWorkExp from "./RevatureWorkExperience";
import ScrollButton from './ScrollButton';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import SkillMatrixContainer from "./SkillMatrixContainer";



const EditEmpPortfolio = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();
  const [feedbackToastsThrown, updateFeedbackToastsThrown] = useState(false);
  let savedFlags = {aboutMe: "",
  certification: "",
  education: "",
  honorsAndAwards: "",
  industryEquivalence: "",
  project: "",
  workExperience: ""};


  if (cookies.portfolio.flags) {
    savedFlags = cookies.portfolio.flags;
  }


  //component info for phase-based submit validation
  const [educations, setEducations] = useState([]);
  const [aboutMe, setAboutMe] = useState(null);
  const [projects, setProjects] = useState([]);
  const [indEquiv, setIndEquiv] = useState([]);

  console.log(cookies['portfolio']);
  
  useEffect( () => {

      //grab education info
      axios.get(url + "/education/portfolio/all/" + cookies['portfolio'].id)
          .then(response => setEducations(response.data));

      //grab about me info
      axios.get(url + "/aboutMe/portfolio/" + cookies['portfolio'].id)
          .then(response => setAboutMe(response.data));

      //grab project info
      axios.get(url + "/projects/portfolio/all/" + cookies['portfolio'].id)
      .then(response => setProjects(response.data));

      //grab industry equivalance info
      axios.get(url + "/equiv/portfolios/all/" + cookies['portfolio'].id)
      .then(response => setIndEquiv(response.data));

      if(!feedbackToastsThrown) {
        
        if(savedFlags.aboutMe){
          toast.warn("FEEDBACK: Admin has provided feedback for About Me, please edit before submitting.");
        }
        if(savedFlags.certification){
          toast.warn("FEEDBACK: Admin has provided feedback for Certification, please edit before submitting.");
        }
        if(savedFlags.education){
          toast.warn("FEEDBACK: Admin has provided feedback for Education, please edit before submitting.");
        }
        if(savedFlags.honorsAndAwards){
          toast.warn("FEEDBACK: Admin has provided feedback for Honors & Awards, please edit before submitting.");
        }
        if(savedFlags.industryEquivalence){
          toast.warn("FEEDBACK: Admin has provided feedback for Industry Equivalency, please edit before submitting.");
        }
        if(savedFlags.project){
          toast.warn("FEEDBACK: Admin has provided feedback for Projects, please edit before submitting.");
        }
        if(savedFlags.workExperience){ 
          toast.warn("FEEDBACK: Admin has provided feedback for Work Experience, please edit before submitting.");
        }
        updateFeedbackToastsThrown(true);
      }

  }, []);
  

  const handleBack = () => {
    removeCookie("portfolio", { maxAge: 0 });
  };

  const submitPortfolio = () => {
    let obj = {
      ...cookies['portfolio'],
      submitted: true
    }
    console.log(obj);

    setCookie('portfolio', obj, { path: '/' });
    axios.post(`${portfolioUrl}/${cookies["portfolio"].id}`, { ...obj }).catch(error => {
        console.log(error);
    });

    window.location.replace("http://localhost:3000/list");
    handleBack();
  }


    const handleSubmit = () => {
        const portfolioObj = {...cookies['portfolio']}
        console.log("Portfolio: " + portfolioObj);

        //Phase 1 Validation
        if(!portfolioObj.reviewed){
            if(aboutMe && educations.length && projects.length){
                 submitPortfolio();
            }
            else{
                console.log("Insufficient work done for phase 1");
                toast.error("Insufficient work done for Phase 1 Portfolio Submission");
                phase1Validation();
            }
        }
        //Phase 2 Validation
        else{
            if(indEquiv.length == 5 && projects.length == 3){
              submitPortfolio();
            }
            else{
                console.log("Insufficient work done for phase 2");
                toast.error("Insufficient work done for Phase 2 Portfolio Submission");
                phase2Validation();
                
            }
        } 
    };

    const phase1Validation = () => {
      if(!aboutMe){
        toast.error("REQUIRED: About Me")
      }
      if(!educations.length){
        toast.error("REQUIRED: Education")
      }
      if(!projects.length){
        toast.error("REQUIRED: Project 1 Information")
      }
    }

    const phase2Validation = () => {
      if(indEquiv.length != 5){
        toast.info("REQUIRED: 5 Skills for Industry Equivalency")
      }
      if(projects.length != 3){
        toast.info("REQUIRED: Project 2 & Project 3 Information")
      }
    }

  const popoverIndustryEquivalency = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        Industry Equivalency Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.industryEquivalence}</Popover.Content>
    </Popover>
  );

  const popoverAboutMe = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        About Me Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.aboutMe}</Popover.Content>
    </Popover>
  );

  const popoverWorkExperience = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        Work Experience Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.workExperience}</Popover.Content>
    </Popover>
  );

  const popoverProject = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        Project Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.project}</Popover.Content>
    </Popover>
  );

  const popoverEducation = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        Education Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.education}</Popover.Content>
    </Popover>
  );

  const popoverCertification = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        Certification Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.certification}</Popover.Content>
    </Popover>
  );

  const popoverHonorsAndAwards = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        Honors & Awards Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.honorsAndAwards}</Popover.Content>
    </Popover>
  );

  if (cookies.portfolio.flags) {
  return (
        <Container className="mb-5 mt-5">
      <div className="container mt-4">
        <h1>{cookies["portfolio"].name}</h1>
      </div>
      <div className="container mb-5 mt-5" id="editPortfolioButtons">
        {/* <Link to="/list"> */}
          <button
            className="btn btn-primary m-1"
            onClick={() => handleSubmit()}
          >
            Submit for Review
          </button>
        {/* </Link> */}
        <Link to="/view">
          <button className="btn btn-primary m-1">View Portfolio</button>
        </Link>
        <Link to="/list">
          <Button
            variant="primary"
            className="m-1"
            onClick={() => handleBack()}
          >
            Back
          </Button>
        </Link>
      </div>
      <Row>
        <Col sm={11}>
          <IndustryEquivalency />
        </Col>
        <Col sm={1}>
          {savedFlags.industryEquivalence !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverIndustryEquivalency}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col sm={11}>
          <AboutMe />
        </Col>
        <Col sm={1}>
          {savedFlags.aboutMe !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverAboutMe}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={11}>
          <RevatureWorkExp />
        </Col>
        <Col sm={1}>
          {savedFlags.workExperience !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverWorkExperience}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={11}>
          <Project />
        </Col>
        <Col sm={1}>
          {savedFlags.project !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverProject}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={11}>
          <EducationContainer />
        </Col>
        <Col sm={1}>
          {savedFlags.education !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverEducation}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={11}>
          <CertificationContainer />
        </Col>
        <Col sm={1}>
          {savedFlags.certification !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverCertification}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={11}>
          <HonorAwards />
        </Col>
        <Col sm={1}>
          {savedFlags.honorsAndAwards !== "" && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverHonorsAndAwards}
            >
              <Button className="flag" variant="error" size = "lg"><h3>⚑</h3></Button>
            </OverlayTrigger>
          )}
        </Col>
      </Row>
      </Container>
  );}
  else {
      return (
        <div>
            <div className="container mt-4">
                <h1>{cookies['portfolio'].name}</h1>
            </div>
            <div className="container mb-5 mt-5" id="editPortfolioButtons">
                {/* <Link to="/list"> */}
                    <button className="btn btn-primary m-1" onClick={() => handleSubmit()}>Submit for Review</button>
                {/* </Link> */}
                <Link to="/view">
                    <button className="btn btn-primary m-1">View Portfolio</button>
                </Link>
                <Link to={{ pathname: `${portfolioUrl}/full/${cookies['portfolio'].id}` }} target="_blank" >
                    <button className="btn btn-primary m-1">Export</button>
                </Link>
                <Link to="/list">
                    <Button variant="primary" className="m-1" onClick={() => handleBack()}>Back</Button>
                </Link>
            </div>
            <IndustryEquivalency /> <br />
            <AboutMe /> <br />
            <RevatureWorkExp /> <br />
            <Project /> <br />
            <OtherWorkExperience /> <br />
            <EducationContainer /> <br />
            <CertificationContainer /> <br />
            <HonorAwards /> <br />
            <ScrollButton /> <br />
            <SkillMatrixContainer />
        </div>


      );
  }
};

export default EditEmpPortfolio;