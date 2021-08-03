import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useCookies } from "react-cookie";
import "../../css/ViewPortfolio.css";
import Matrix from "../../interfaces/Matrix";
import { matrixUrl } from "../../api/api";

const SkillMatrixView = () => {
  const [matrices, setMatrices] = useState<Matrix[]>();
  const [cookie] = useCookies();

  useEffect(() => {
    axios
      .get<Matrix[]>(matrixUrl + `/portfolio/${cookie["portfolio"].id}`)
      .then((response) => {
        setMatrices(response.data);
      });
  }, [null]);

  const renderMatrices = (matList: Matrix[]) => {
    return matList.map((data) => {
      return (
        <div className="card" key={data.id} data-testid="card">
          <div className="card-header" id="bottom-border">
            <h1>{data.header}</h1>
          </div>
          <div className="card-body">
            <h5 style={{ fontWeight: "bold" }}>Skills:</h5>
            {data.skills.map((skill) => {
              return (
                <p>
                  {skill.name}: {skill.value} months
                </p>
              );
            })}
          </div>
        </div>
      );
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

export default SkillMatrixView;
