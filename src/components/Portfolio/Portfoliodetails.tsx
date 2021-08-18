import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import queryString from "query-string";
import React, { CSSProperties, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { portfolioUrl } from "../../api/api";
import "../../css/HonorAwards.css";

const Portfoliodetails = (props: any) => {
  const [portId, setPortId] = useState(0);
  const [name, setPortName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [approved, setApproved] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [user, setUser] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies();

  const { search } = useLocation();
  const { id } = queryString.parse(search);
  console.log("portfolio id=" + id);

  let ButtonStyles: CSSProperties = {
    background: "#F26925",
    borderColor: "#474C55",
  };

  const getData = async () => {
    axios.get(`${portfolioUrl}/${id}`).then(({ data }) => {
      console.log("getData()", data);
      setPortId(data.id);
      setPortName(data.name);
      setSubmitted(data.submitted);
      setApproved(data.approved);
      setReviewed(data.reviewed);
      setFeedback(data.feedback);
      setUser(data.user);
    });
  };

  useEffect(() => {
    getData();
  }, [portId]);

  const onBacksub = () => {
    props.history.push("/admin");
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!approved && !feedback) {
      toast.error(
        "Feedback must be provided if rejecting the portfolio. Your changes are not saved"
      );
    } else {
      // this will be axios put to update portfolios back end
      console.log(
        "update" + portId + name + submitted + approved + reviewed + feedback
      );
      axios.post(`${portfolioUrl}/${id}`, {
        portId,
        name,
        submitted,
        approved,
        reviewed,
        feedback,
        user: user,
      });
    }

    props.history.push("/admin");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Container>
          <h3>Approve/Reject/Review</h3>

          <Button type="submit" onClick={onBacksub} style={ButtonStyles}>
            Back
          </Button>

          <Row>
            <Col lg={2}>
              <Form.Label> Portfolios id </Form.Label>
            </Col>
            <Col lg={2}>{portId}</Col>
          </Row>
          <Row>
            <Col lg={2}>
              <Form.Label> Portfolios Name </Form.Label>
            </Col>
            <Col lg={2}>{name}</Col>
          </Row>
          <Row>
            <Col lg={2}>Review Completed</Col>
            <Col lg={2}>
              <Form.Check
                type="checkbox"
                name="reviewed"
                checked={reviewed}
                onChange={(e) => setReviewed(e.target.checked)}
              />
            </Col>
          </Row>
          <Row>
            <Row>
              <Col lg={2}>Approved</Col>
              <Col lg={2}>
                <Form.Check
                  type="checkbox"
                  name="approve"
                  checked={approved}
                  onChange={(e) => setApproved(e.target.checked)}
                />
              </Col>
            </Row>
            <Col>
              <Form.Label as="legend">Feedback</Form.Label>

              <div>
                <textarea
                  name="feedback"
                  cols={50}
                  rows={6}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <Button type="submit" style={ButtonStyles}>
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </form>
    </div>
  );
};

export default Portfoliodetails;
