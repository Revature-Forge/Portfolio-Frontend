import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { portfolioUrl, workExperienceUrl, url } from "../../api/api";
import "../../css/ViewPortfolio.css";
import ScrollButton from "../ScrollButton";
import AboutMeView from "./AboutMeView";
import CertificationView from "./CertificationView";
import EducationView from "./EducationView";
import HonorAwardView from "./HonorAwardView";
import IndustryEquivalencyView from "./IndustryEquivalencyView";
import ProjectView from "./ProjectView";
import RevatureWorkExperienceView from "./RevatureWorkExperienceView";
import SkillMatrixView from "./SkillMatrixView";
import SkillMatrixViewPie from "./SkillMatrixViewPie";
import { useAppDispatch } from '../../store/Hooks';
import { setFullPortfolio } from '../../features/FullPortfolioSlice';



type FeedbackData = {
  industryEquivalence: string;
  aboutMe: string;
  workExperience: string;
  project: string;
  education: string;
  certification: string;
  honorsAndAwards: string;
  skillMatrices: string;
};

const ViewPortfolio = () => {
  const [cookie, , removeCookie] = useCookies();
  const [pathname, setPath] = useState("/list");
  const [isAdmin, setAdmin] = useState(false);
  const { register, handleSubmit } = useForm<FeedbackData>();
  const [savedFlags, setSavedFlags] = useState({
    aboutMe: "",
    certification: "",
    education: "",
    honorsAndAwards: "",
    industryEquivalence: "",
    project: "",
    workExperience: "",
    skillMatrices: "",
  });


  let history = useHistory();
  const dispatch = useAppDispatch();



  const onReject = handleSubmit((data) => {
    axios.post(`${portfolioUrl}/${cookie.portfolio.id}`, {
      id: cookie.portfolio.id,
      name: cookie.portfolio.name,
      submitted: false,
      approved: false,
      reviewed: true,
      feedback: cookie.portfolio.feedback,
      flags: data,
      user: cookie.user,
      admin: cookie.admin
    });

    history.push("/admin");
    console.log(cookie.user);
  });

  const onApprove = handleSubmit((data) => {
    axios.post(`${portfolioUrl}/${cookie.portfolio.id}`, {
      id: cookie.portfolio.id,
      name: cookie.portfolio.name,
      submitted: false,
      approved: true,
      reviewed: true,
      feedback: null,
      flags: null,
      user: cookie.user,
      admin: cookie.admin
    });

    history.push("/admin");
    console.log(cookie.user);
  });

  if (!cookie.portfolio.flags) {
    cookie.portfolio.flags = {
      aboutMe: "",
      certification: "",
      education: "",
      honorsAndAwards: "",
      industryEquivalence: "",
      project: "",
      workExperience: "",
      skillMatrices: "",
    };
  }

  useEffect(() => {

    axios
      .get(url + `/portfolios/${cookie["portfolio"].id}`)
      .then((response) => {
        // dispatch(setFullPortfolio({fullPortfolio: response.data }));
        if (response.data.flags) {
          console.log(response.data.flags);
          setSavedFlags(response.data.flags);
        } else {
          console.log("No flags");
        }
      });

    axios
      .get(url + `/portfolios/full/${cookie["portfolio"].id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(setFullPortfolio({ fullPortfolio: res.data }));
      });
  }, []);

  useEffect(() => {
    if (cookie["admin"] && cookie["admin"].admin === true) {
      setPath("/admin");
      setAdmin(true);
    } else {
      setPath(cookie["portfolio"].submitted ? "/list" : "/portfolio");
    }
  });

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

  const popoverSkillMatrices = (
    <Popover id="popover-basic">
      <Popover.Title className="flagPopover" as="h3">
        Skill Matrices Feedback
      </Popover.Title>
      <Popover.Content>{savedFlags.skillMatrices}</Popover.Content>
    </Popover>
  );

  const handleBack = (submitted: boolean) => {
    console.log(submitted);
    if (submitted) removeCookie("portfolio");
  };

  if (isAdmin && cookie.portfolio.submitted) {
    return (
      <Container className="m-5 mx-auto">
        <form>
          <h2 id="port-details" style={{ margin: "10px 10px 10px 30px" }}>
            <strong>Portfolio Name:</strong> {cookie.portfolio.name} |{" "}
            <strong>Employee Name:</strong> {cookie.portfolio.user.fname}{" "}
            {cookie.portfolio.user.lname}
          </h2>
          <button
            onClick={onReject}
            id="admin-button"
            style={{ margin: "10px 10px 20px 25px" }}
            className="btn btn-primary "
          >
            Submit Feedback
          </button>
          <button
            onClick={onApprove}
            id="admin-button"
            style={{ margin: "10px 10px 20px 10px" }}
            className="btn btn-primary "
          >
            Approve Portfolio
          </button>
          <Link to={pathname}>
            <button
              id="admin-button"
              style={{ margin: "10px 10px 20px 10px" }}
              className="btn btn-primary"
              onClick={() => handleBack(cookie["portfolio"].submitted)}
            >
              Back
            </button>
          </Link>
          <Row>
            <Col sm={8}>
              <IndustryEquivalencyView />
            </Col>
            <Col sm={4}>
              {savedFlags.industryEquivalence !== "" && (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popoverIndustryEquivalency}
                >
                  <Button className="flag" variant="error" size="lg">
                    <h3>⚑</h3>
                  </Button>
                </OverlayTrigger>
              )}
              <textarea
                rows={5}
                cols={40}
                placeholder="Insert new feedback here..."
                {...register("industryEquivalence")}
              >
                {cookie.portfolio.flags.industryEquivalence}
              </textarea>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col sm={8}>
              <AboutMeView />
            </Col>
            <Col sm={4}>
              {savedFlags.aboutMe !== "" && (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popoverAboutMe}
                >
                  <Button className="flag" variant="error" size="lg">
                    <h3>⚑</h3>
                  </Button>
                </OverlayTrigger>
              )}
              <textarea
                rows={5}
                cols={40}
                placeholder="Insert new feedback here..."
                {...register("aboutMe")}
              >
                {cookie.portfolio.flags.aboutMe}
              </textarea>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col sm={8}>
              <RevatureWorkExperienceView
                url={url + "/workexperience/portfolio/all/"}
                title="Work Experience"
              />
            </Col>
            <Col sm={4}>
              {savedFlags.workExperience !== "" && (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popoverWorkExperience}
                >
                  <Button className="flag" variant="error" size="lg">
                    <h3>⚑</h3>
                  </Button>
                </OverlayTrigger>
              )}
              <textarea
                rows={5}
                cols={40}
                placeholder="Insert new feedback here..."
                {...register("workExperience")}
              >
                {cookie.portfolio.flags.workExperience}
              </textarea>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col sm={8}>
              <ProjectView />
            </Col>
            <Col sm={4}>
              {savedFlags.project !== "" && (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popoverProject}
                >
                  <Button className="flag" variant="error" size="lg">
                    <h3>⚑</h3>
                  </Button>
                </OverlayTrigger>
              )}
              <textarea
                rows={5}
                cols={40}
                placeholder="Insert new feedback here..."
                {...register("project")}
              >
                {cookie.portfolio.flags.project}
              </textarea>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col sm={8}>
              <EducationView />
            </Col>
            <Col sm={4}>
              {savedFlags.education !== "" && (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popoverEducation}
                >
                  <Button className="flag" variant="error" size="lg">
                    <h3>⚑</h3>
                  </Button>
                </OverlayTrigger>
              )}
              <textarea
                rows={5}
                cols={40}
                placeholder="Insert new feedback here..."
                {...register("education")}
              >
                {cookie.portfolio.flags.education}
              </textarea>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col sm={8}>
              <CertificationView />
            </Col>
            <Col sm={4}>
              {savedFlags.certification !== "" && (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popoverCertification}
                >
                  <Button className="flag" variant="error" size="lg">
                    <h3>⚑</h3>
                  </Button>
                </OverlayTrigger>
              )}
              <textarea
                rows={5}
                cols={40}
                placeholder="Insert new feedback here..."
                {...register("certification")}
              >
                {cookie.portfolio.flags.certification}
              </textarea>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col sm={8}>
              <HonorAwardView />
            </Col>
            <Col sm={4}>
              {savedFlags.honorsAndAwards !== "" && (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popoverHonorsAndAwards}
                >
                  <Button className="flag" variant="error" size="lg">
                    <h3>⚑</h3>
                  </Button>
                </OverlayTrigger>
              )}
              <textarea
                rows={5}
                cols={40}
                placeholder="Insert new feedback here..."
                {...register("honorsAndAwards")}
              >
                {cookie.portfolio.flags.honorsAndAwards}
              </textarea>
              <br />
              <br />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col sm={8}>
              <SkillMatrixView />
            </Col>
            <Col sm={4}>
              {savedFlags.skillMatrices !== "" && (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popoverSkillMatrices}
                >
                  <Button className="flag" variant="error" size="lg">
                    <h3>⚑</h3>
                  </Button>
                </OverlayTrigger>
              )}
              <textarea
                rows={5}
                cols={40}
                placeholder="Insert new feedback here..."
                {...register("skillMatrices")}
              >
                {cookie.portfolio.flags.skillMatrices}
              </textarea>
              <br />
              <br />
            </Col>
          </Row>
        </form>
        <ScrollButton />
      </Container>
    );
  } else {
    return (
      <div>
        <Container className="mb-5 mt-5">
          <h2 id="port-details">
            <strong>Portfolio Name:</strong> {cookie.portfolio.name} |{" "}
            <strong>Employee Name:</strong> {cookie.portfolio.user.fname}{" "}
            {cookie.portfolio.user.lname}
          </h2>
          <Col sm={11}>
            <div className="container mb-5 mt-5" id="editPortfolioButtons">
              <Link to={pathname}>
                <button
                  id="admin-button"
                  className="btn btn-primary m-1"
                  onClick={() => handleBack(cookie["portfolio"].submitted)}
                >
                  Back
                </button>
              </Link>
            </div>
          </Col>

          <Row>
            <Col sm={11}>
              <IndustryEquivalencyView />
            </Col>
            <Col sm={1}>
              {savedFlags.industryEquivalence !== "" && (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popoverIndustryEquivalency}
                >
                  <Button className="flag" variant="error" size="lg">
                    ⚑
                  </Button>
                </OverlayTrigger>
              )}
            </Col>
          </Row>

          <Row className="mt-5">
            <Col sm={11}>
              <AboutMeView />
            </Col>
            <Col sm={1}>
              {savedFlags.aboutMe !== "" && (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popoverAboutMe}
                >
                  <Button className="flag" variant="error" size="lg">
                    ⚑
                  </Button>
                </OverlayTrigger>
              )}
            </Col>
          </Row>
          <Row className="mt-5">
            <Col sm={11}>
              <RevatureWorkExperienceView
                url={workExperienceUrl + "/portfolio/all/"}
                title="Work Experience"
              />
            </Col>
            <Col sm={1}>
              {savedFlags.workExperience !== "" && (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popoverWorkExperience}
                >
                  <Button className="flag" variant="error" size="lg">
                    ⚑
                  </Button>
                </OverlayTrigger>
              )}
            </Col>
          </Row>
          <Row className="mt-5">
            <Col sm={11}>
              <ProjectView />
            </Col>
            <Col sm={1}>
              {savedFlags.project !== "" && (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popoverProject}
                >
                  <Button className="flag" variant="error" size="lg">
                    ⚑
                  </Button>
                </OverlayTrigger>
              )}
            </Col>
          </Row>
          <Row className="mt-5">
            <Col sm={11}>
              <EducationView />
            </Col>
            <Col sm={1}>
              {savedFlags.education !== "" && (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popoverEducation}
                >
                  <Button className="flag" variant="error" size="lg">
                    ⚑
                  </Button>
                </OverlayTrigger>
              )}
            </Col>
          </Row>
          <Row className="mt-5">
            <Col sm={11}>
              <CertificationView />
            </Col>
            <Col sm={1}>
              {savedFlags.certification !== "" && (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popoverCertification}
                >
                  <Button className="flag" variant="error" size="lg">
                    ⚑
                  </Button>
                </OverlayTrigger>
              )}
            </Col>
          </Row>
          <Row className="mt-5">
            <Col sm={11}>
              <HonorAwardView />
            </Col>
            <Col sm={1}>
              {savedFlags.honorsAndAwards !== "" && (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popoverHonorsAndAwards}
                >
                  <Button className="flag" variant="error" size="lg">
                    ⚑
                  </Button>
                </OverlayTrigger>
              )}
            </Col>
          </Row>
          <Row className="mt-5">
            <Col sm={11}>
              <SkillMatrixViewPie />
            </Col>
            <Col sm={1}>
              {savedFlags.skillMatrices !== "" && (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popoverSkillMatrices}
                >
                  <Button className="flag" variant="error" size="lg">
                    ⚑
                  </Button>
                </OverlayTrigger>
              )}
            </Col>
          </Row>
        </Container>
        <ScrollButton />
      </div>
    );
  }
};

export default ViewPortfolio;
