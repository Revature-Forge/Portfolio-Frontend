import { useState, useEffect } from "react";
import { matrixUrl } from "../api/api";
import { useCookies } from "react-cookie";
import Matrix, { Skill } from "../interfaces/Matrix";
import axios from "axios";
import { Card } from "react-bootstrap";
import createChart from "./SkillMatrixPieChart";
import { Modal, Button, ModalBody } from "react-bootstrap";
import { Tooltip } from 'reactstrap';
import { QuestionCircle, PlusCircle, Pencil, XCircle } from 'react-bootstrap-icons';

const SkillMatrixContainer = () => {

	/* ---------------------------------------------------------------- */
  // COOKIE STATES
  /* ---------------------------------------------------------------- */
  const [cookies] = useCookies();
  const portfolio = cookies["portfolio"];
  /*-----------------------------------------------------------------*/

	/* ---------------------------------------------------------------- */
  // TOOLTIP STATES AND FUNCTIONS
  /* ---------------------------------------------------------------- */
  const [addTooltipOpen, setAddTooltipOpen] = useState<boolean>(false);
  const [detailsTooltipOpen, setDetailsTooltipOpen] = useState<boolean>(false);
  
  const toggleAdd = () => setAddTooltipOpen(!addTooltipOpen);
  const toggleDetails = () => setDetailsTooltipOpen(!detailsTooltipOpen);
  
  /* ---------------------------------------------------------------- */
  // Modal STATES AND FUNCTIONS
  /* ---------------------------------------------------------------- */
  
  const [showAdd, setShowAdd] = useState<boolean>(false);
  
   const handleAddShow = () => {
    if (matrices.length >= 6) {
      alert(
        "No more than 6 Matrices can be added to the Skill Matrix Section."
      );
      return;
    }
    setShowAdd(true);
  };
  const handleAddClose = () => {
    setShowAdd(false);
  };
  
  
				 /* ---------------------------------------------------------------- */
				  // SKILL MATRIX STATES
				  /* ---------------------------------------------------------------- */
				  
  
  const [matrices, setMatrices] = useState<Array<Matrix>>([]);
  const [matrixName, setMatrixName] = useState<string>("");
  
 
  
    const [showDetailMatrix, setShowDetailsMatrix] = useState(false);
  const handleCloseDetailsMatrix = () => setShowDetailsMatrix(false);
  const handleCloseDetails = () => setShowDetails(false);
  
  const [detailsModalMatrix, setDetailModalMatrix] = useState({ header: ""});

  const handleShowDetailsMatrix = (matrix: Matrix) =>{
    setShowDetailsMatrix(true);
    setDetailModalMatrix(matrix);
  };

   const newMatrix:Matrix = {
    id: 0, header: "", portfolio: portfolio, skills: []
  }
	
  const [showDetails, setShowDetails] = useState(false);
  const handleShowDetails = () =>{ setShowDetails(true) };

  const [detailsUpdateModalMatrix, setUpdateDetailModalMatrix] = useState(newMatrix);
  const [showUpdateDetailMatrix, setUdpateShowDetailsMatrix] = useState(false);
  
  const handleUpdateShowDetailsMatrix = (matrix: Matrix) =>{
    setUdpateShowDetailsMatrix(true);
    setUpdateDetailModalMatrix(matrix);
    setUpdateSkillName1("");
    setUpdateSkillValue1(0);
  };

  const handleUpdateShowDetailsMatrixClose = () => {
    setUdpateShowDetailsMatrix(false);
    getMatrices();
  };

  
				/* ---------------------------------------------------------------- */
			  // SKILL STATES
			  /* ---------------------------------------------------------------- */
  
   const [updateSkillName1, setUpdateSkillName1] = useState<string>("");
  const [updateSkillValue1, setUpdateSkillValue1] = useState<number>(0);

  const newSkill:Skill = {
    id:0, name:"", value:0
  }

  const[detailMatrixSkill, setDetailMatrixSkill] = useState<Skill>(newSkill);

  const handleDetailMatrixSkill = (skill:Skill) => {
    setDetailMatrixSkill(skill);
  }

  const [showSkillModalAdd, setShowSkillModalAdd] = useState(false);

  const handleShowSkillModalAdd = () => {
    setShowSkillModalAdd(true);
    setUpdateSkillName1("");
    setUpdateSkillValue1(0);
  }

  const handleCloseSkillModalAdd = () => {
    setShowSkillModalAdd(false);
  }

  const [showSkillModalEdit, setShowSkillModalEdit] = useState(false);

  const handleShowSkillMatrixModal = (skill: Skill) =>{
    setShowSkillModalEdit(true);
    setDetailMatrixSkill(skill);
	setUpdateSkillName1(skill.name);
    setUpdateSkillValue1(skill.value);
  };

  const closeSkillModalEdit = () =>{
    setShowSkillModalEdit(false);
  }
  
  /* ---------------------------------------------------------------- */

  // AXIOS FUNCTIONS

  /* ---------------------------------------------------------------- */
  // GET SKILL MATRIX ARRAY
  /* ---------------------------------------------------------------- */
  const getMatrices = () => {
    axios
      .get(`${matrixUrl}/portfolio/${portfolio.id}`)
      .then((response) => setMatrices(response.data))
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getMatrices();
  }, );


    /* ---------------------------------------------------------------- */
    // ADD EQUIVALENCY Matrix
    /* ---------------------------------------------------------------- */
    const addMatrix = (async () => {
      let newMatrix: Matrix = {
          id: 0,
          header: matrixName,
          portfolio: portfolio,
          skills: []
      }
      axios.post(matrixUrl, newMatrix)
          .then(resp => {
              // If POST is successful, add new Skill (with correct data) to the Skill Array
              console.log("Add")
          })
          .catch(error => {
              console.error(error);
          });
      setShowAdd(false);
      setMatrixName('');
  });
  /* ---------------------------------------------------------------- */


    /* ---------------------------------------------------------------- */
    // ADD Update Matrix
    /* ---------------------------------------------------------------- */
    const updateMatrix = (async (matrix: Matrix) => {
      axios.put(matrixUrl, matrix)
          .then(resp => {
              // If POST is successful, add new Skill (with correct data) to the Skill Array
              console.log("Update")
          })
          .catch(error => {
              console.error(error);
          })
      setMatrixName('');
  });
  /* ---------------------------------------------------------------- */

   /* ---------------------------------------------------------------- */
    // ADD Update Matrix
    /* ---------------------------------------------------------------- */
    const deleteMatrix = (async (id: number) => {
      axios.delete(`${matrixUrl}/${id}`)
          .then(resp => {
              // If POST is successful, add new Skill (with correct data) to the Skill Array
              console.log("Delete")
              console.log(id)
          })
          .catch(error => {
              console.error(error);
          });
      setMatrixName('');
  });
  /* ---------------------------------------------------------------- */

  /* ---------------------------------------------------------------- */
    // ADD Update Matrix Add a Skill
    /* ---------------------------------------------------------------- */
    const addOrEditSkill = (async (id: number, skill: Skill) => {
      axios.put(`${matrixUrl}/${id}/skill`, skill)
          .then(resp => {
              // If POST is successful, add new Skill (with correct data) to the Skill Array
              console.log("Delete")
              console.log(id)
          })
          .catch(error => {
              console.error(error);
          });
      setMatrixName('');
  });
  /* ---------------------------------------------------------------- */

  /* ---------------------------------------------------------------- */
    // ADD Update Matrix Delete a Skill
    /* ---------------------------------------------------------------- */
    const deleteSkill = (async (id: number) => {
      axios.delete(`${matrixUrl}/skill/${id}`)
          .then(resp => {
              // If POST is successful, add new Skill (with correct data) to the Skill Array
              console.log("Delete")
              console.log(id)
          })
          .catch(error => {
              console.error(error);
          });
      setMatrixName('');
  });
  /* ---------------------------------------------------------------- */

  // Render FUNCTIONS

  /* ---------------------------------------------------------------- */
  
   const renderSkillMatrix = (matrices: Matrix[]) => {
    return matrices.map(data => {
      return (
        <div key={data.id} className="container">
         {createChart(data)}
         <Card>
          <Card.Header>
            <h4>
              {data.header}
              <QuestionCircle id={data.header} onClick={() => handleShowDetailsMatrix(data)} />
              <Pencil onClick={()=>handleUpdateShowDetailsMatrix(data) } />
              <PlusCircle onClick={()=> { handleShowSkillModalAdd(); setUpdateDetailModalMatrix(data);}} ></PlusCircle>
              <XCircle onClick={() => { deleteMatrix(data.id); }} />
            </h4>
          </Card.Header>

           <Card.Body>
             <ul>
                {data.skills.map(s => 
                <li>
                  {s.name}
                <Pencil onClick={() => {setUpdateDetailModalMatrix(data); handleShowSkillMatrixModal(s)}}></Pencil>
                <XCircle onClick={() => { deleteSkill(s.id); }}></XCircle>
                </li>
                )}
             </ul>
          </Card.Body>
         </Card>
        </div>
      );
    });
  }

  return (
    <>
      <div className="container">
        <Card id="card-container">
          <Card.Header id="header">
            <h4>
              Skill Matrix
              <QuestionCircle id="card-info" onClick={handleShowDetails} />
              <Tooltip target="card-info" isOpen={detailsTooltipOpen} toggle={toggleDetails}>Details</Tooltip>
              <PlusCircle id="add-equivalency" onClick={handleAddShow} style={{marginRight: "10px"}} />
              <Tooltip target="add-equivalency" isOpen={addTooltipOpen} toggle={toggleAdd}>Add Industry Equivalency</Tooltip>
            </h4>
          </Card.Header>
          <Modal show={showAdd} onHide={handleAddClose} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Add Skill Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="skillTitle"><h6>Skill Category Name</h6></label>
                                <input
                                    className="form-control"
                                    name="skillTitle"
                                    value={matrixName}
                                    onChange={(ev) => { setMatrixName(ev.target.value); }}>
                                </input>
                            </div>
                            <br />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleAddClose}>Close</Button>
                        <Button variant="primary" className="oButton" onClick={() => {addMatrix(); ;}}>Add</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showDetails} onHide={handleCloseDetails}>
                    <Modal.Header>
                        <Modal.Title>Details</Modal.Title>
                        <XCircle id="work-experience-details" onClick={handleCloseDetails}/>
                    </Modal.Header>
                    <ModalBody>
                        <p>
                            Add your <b>top 5 key skills</b> and the equivalency in months for each skill.
                        </p>
                    </ModalBody>
                </Modal>
              <Modal show={showDetailMatrix} onHide={handleCloseDetailsMatrix}>
                <Modal.Header>
                    <Modal.Title>Details</Modal.Title>
                    <XCircle id="work-experience-details" onClick={handleCloseDetailsMatrix}/>
                </Modal.Header>
                <ModalBody>
                    <p>
                      Edit <b>{detailsModalMatrix.header}</b>
                    </p>
                </ModalBody>
               </Modal>
            <Modal show={showUpdateDetailMatrix} onHide={handleUpdateShowDetailsMatrixClose} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Edit Skill Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="skillTitle1"><h6>Skill Category Name</h6></label>
                                <input
                                    className="form-control"
                                    name="skillTitle1"
                                    value={detailsUpdateModalMatrix.header}
                                    onChange={(ev) => {
                                      const updateNewMatrix = {
                                        id:  detailsUpdateModalMatrix.id,
                                        header: ev.target.value,
                                        portfolio: portfolio,
                                        skills: detailsUpdateModalMatrix.skills
                                      }
                                      setUpdateDetailModalMatrix(updateNewMatrix)
                                      }}>
                                </input>        
                            </div>
                            <br />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleUpdateShowDetailsMatrixClose}>Close</Button>
                        <Button variant="primary" className="oButton" onClick={() => {
                          handleUpdateShowDetailsMatrixClose();
                          updateMatrix(detailsUpdateModalMatrix);
                          }}>Update</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showSkillModalAdd} onHide={handleCloseSkillModalAdd} backdrop="static">
                  <Modal.Header>
                    <Modal.Title>Add Skill</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form>
                          <div className="form-group">
                          <label htmlFor="skillTitle11"><h6>Add Skill Name</h6></label>
                                    <input
                                        className="form-control"
                                        name="skillTitle11"
                                        value={updateSkillName1}
                                        onChange={(ev) => {
                                          setUpdateSkillName1(ev.target.value)
                                          }}>
                                    </input>
                            <label htmlFor="skillValue11"><h6>Add Skill Value</h6></label>
                                    <input
                                        className="form-control"
                                        name="skillValue11"
                                        value={updateSkillValue1}
                                        onChange={(ev) => {
                                          !isNaN(parseInt(ev.target.value)) ?
                                          setUpdateSkillValue1(parseInt(ev.target.value)) : setUpdateSkillValue1(0);
                                          }}>
                                    </input>
                            </div>        
                            <br />
                      </form>      
                  </Modal.Body>
                  <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseSkillModalAdd}>Close</Button>
                        <Button variant="primary" onClick={() => {
                          const skill1:Skill =
                          {id:0, name: updateSkillName1 , value: updateSkillValue1 }
                          handleDetailMatrixSkill(skill1);
                          addOrEditSkill(detailsUpdateModalMatrix.id, skill1);
                          handleCloseSkillModalAdd();
                        }}>Add Skill</Button>
                  </Modal.Footer>
                </Modal>
                <Modal show={showSkillModalEdit} onHide={closeSkillModalEdit} backdrop="static">
                  <Modal.Header>
                    <Modal.Title>Edit Skill {detailMatrixSkill.name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="container">
                          <form>
                          <label htmlFor="skillTitle11"><h6>Add Skill Name</h6></label>
                                    <input
                                        className="form-control"
                                        name="skillTitle11"
                                        value={updateSkillName1}
                                        onChange={(ev) => {
                                          setUpdateSkillName1(ev.target.value)
                                          }}>
                                    </input>
                            <label htmlFor="skillValue11"><h6>Add Skill Value</h6></label>
                                    <input
                                        className="form-control"
                                        name="skillValue11"
                                        value={updateSkillValue1}
                                        onChange={(ev) => {
                                          !isNaN(parseInt(ev.target.value)) ?
                                          setUpdateSkillValue1(parseInt(ev.target.value)) : setUpdateSkillValue1(0);
                                          }}>
                                    </input>        
                            <br />
                        </form>
                    </div>    
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={closeSkillModalEdit}>Close</Button>
                    <Button variant="primary" onClick={() => {
                      const skill1:Skill =
                      {id:detailMatrixSkill.id, name: updateSkillName1 , value: updateSkillValue1 }
                      handleDetailMatrixSkill(skill1);
                      addOrEditSkill(detailsUpdateModalMatrix.id, skill1);
                      closeSkillModalEdit();
                    }}>Update</Button>
                  </Modal.Footer>
                </Modal>
          <Card.Body id="industry">
            {matrices && renderSkillMatrix(matrices)}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SkillMatrixContainer;

  