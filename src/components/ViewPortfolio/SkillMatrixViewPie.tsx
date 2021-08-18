import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useCookies } from "react-cookie";
import "../../css/ViewPortfolio.css";
import Matrix from "../../interfaces/Matrix";
import { matrixUrl } from "../../api/api";
import SkillMatrixPieChart from "../SkillMatrix/SkillMatrixPieChart";

const SkillMatrixViewPie = () => {
  const [matrices, setMatrices] = useState<Matrix[]>();
  const [cookie] = useCookies();

  useEffect(() => {
    axios
      .get<Matrix[]>(matrixUrl + `/portfolio/${cookie["portfolio"].id}`)
      .then((response) => {
        setMatrices(response.data);
      });
  }, [cookie]);

  const renderMatrices = (matList: Matrix[]) => {
    return matList.map((data: Matrix) => {
      return SkillMatrixPieChart(data);
    });
  };

  return (
    <div className="container">
      <Card id="card-container">
        <Card.Header id="header">
          <h4>Skill Matrices</h4>
        </Card.Header>
        <Card.Body>{matrices && renderMatrices(matrices)}</Card.Body>
      </Card>
    </div>
  );
};

export default SkillMatrixViewPie;
