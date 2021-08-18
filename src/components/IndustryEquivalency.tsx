import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/IndustryEquivalency.css';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'
import { Card, Button, Modal, ModalBody } from 'react-bootstrap';
import { QuestionCircle, PlusCircle, Pencil, XCircle } from 'react-bootstrap-icons';
import { Tooltip } from 'reactstrap';
import {url} from "../api/api";
import {toast} from "react-toastify";
import industrySkillValidation from './Validation/IndustryEquivalencyValidation';
import styleInvalidElements, { styleInvalidElementsByName } from "./Validation/InvalidFormHandling";
import ValidationMsg from './Validation/ValidationMsg'
// JSON INTERFACES

/* ------------------------ */
// EQUIVALENCY DATA TYPE
/* ----------------  -------- */
export interface Skill {
    id: number;
    header: string;
    value: number;
    portfolio: {
        id: number;
        name: string;
        user: {
            id: number;
            fName: string;
            lName: string;
            email: string;
            password: string;
            admin: boolean;
        }
        submitted: boolean;
        approved: boolean;
        reviewed: boolean;
        feedback: string;
    }
}
/* ------------------------ */
// <OPTION> DATA TYPE
/* ------------------------ */
export interface Option {
    value: string;
    labelText: string;
    disabledStatus: boolean;
}
/* ------------------------ */

// STATIC VARIABLES
/* ---------------------------------------------------------------- */
// OPTION DATA
// question: should this be stored in the database and editable by staff/admin?
/* ---------------------------------------------------------------- */
const titleOptions: Array<Option> = [
    { value: '', labelText: 'Select a skill', disabledStatus: true },
    { value: 'Java', labelText: 'Java', disabledStatus: false },
    { value: 'SQL', labelText: 'SQL', disabledStatus: false },
    { value: 'JavaScript', labelText: 'JavaScript', disabledStatus: false },
    { value: 'TypeScript', labelText: 'TypeScript', disabledStatus: false },
    { value: 'Angular 2+', labelText: 'Angular 2+', disabledStatus: false },
    { value: 'Spring Framework', labelText: 'Spring Framework', disabledStatus: false },
    { value: 'Spring Data', labelText: 'Spring Data', disabledStatus: false },
    { value: 'Spring Boot', labelText: 'Spring Boot', disabledStatus: false },
    { value: 'Spring MVC', labelText: 'Spring MVC', disabledStatus: false },
    { value: 'Spring AOP', labelText: 'Spring AOP', disabledStatus: false },
    { value: 'Hibernate', labelText: 'Hibernate', disabledStatus: false },
    { value: 'JDBC', labelText: 'JDBC', disabledStatus: false },
    { value: 'DevOps', labelText: 'DevOps', disabledStatus: false },
    { value: 'Microservices', labelText: 'Microservices', disabledStatus: false },
    { value: 'JUnit', labelText: 'JUnit', disabledStatus: false },
    { value: 'AWS', labelText: 'AWS', disabledStatus: false }
];
const prevExpOption: Array<Option> = [
    { value: "0", labelText: "None / I'd never heard of it", disabledStatus: false },
    { value: "1", labelText: "Cursory Study (No Hands-on Experience)", disabledStatus: false },
    { value: "2", labelText: "Involved in at Least One Project (Minor Hands-on Experience)", disabledStatus: false },
    { value: "4", labelText: "Involved in Multiple Projects (Substantial Hands-on Experience)", disabledStatus: false }
];
const currExpOption: Array<Option> = [
    { value: "0", labelText: "None", disabledStatus: false },
    { value: "3", labelText: "I used it in at least one project", disabledStatus: false },
    { value: "6", labelText: "I used it in about half of my projects", disabledStatus: false },
    { value: "12", labelText: "I worked directly with it in every project", disabledStatus: false }
];
/* ---------------------------------------------------------------- */

const IndustryEquivalency = () => {

    // STATE VARIABLES

    /* ---------------------------------------------------------------- */
    // TOOLTIP STATES
    /* ---------------------------------------------------------------- */
    const [addTooltipOpen, setAddTooltipOpen] = useState<boolean>(false);
    const [editTooltipOpen, setEditTooltipOpen] = useState<boolean>(false);
    const [detailsTooltipOpen, setDetailsTooltipOpen] = useState<boolean>(false);
    /* ---------------------------------------------------------------- */
    // MODAL STATES
    /* ---------------------------------------------------------------- */
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showDetails, setShowDetails] = useState(false);
    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails= () => setShowDetails(true);
    /* ---------------------------------------------------------------- */
    // INDUSTRY EQUIVALENCY STATES
    /* ---------------------------------------------------------------- */
    const [skillSet, setSkillSet] = useState<Array<Skill>>([]);
    const [maxEquivalency, setMaxEquivalency] = useState<number>(0);
    /* ---------------------------------------------------------------- */
    // COOKIE STATES
    /* ---------------------------------------------------------------- */
    const [cookies] = useCookies();
    const portfolio = cookies['portfolio'];
    /* ---------------------------------------------------------------- */
    // ADD SKILL STATES
    /* ---------------------------------------------------------------- */
    const [skillName, setSkillName] = useState<string>('');
    const [previousExp, setPreviousExp] = useState<string>('0');
    const [currentExp, setCurrentExp] = useState<string>('0');
    const [equivalency, setEquivalency] = useState<number>(0);
    /* ---------------------------------------------------------------- */

    //Render Error Messages
    //*****************************************************/
    const [validationErrors, setValidationErrors] =  useState<string[]>([]);
    //*****************************************************/

    // TOOLTIP FUNCTIONS

    /* ---------------------------------------------------------------- */
    const toggleAdd = (() => setAddTooltipOpen(!addTooltipOpen));
    const toggleEdit = (() => setEditTooltipOpen(!editTooltipOpen));
    const toggleDetails = (() => setDetailsTooltipOpen(!detailsTooltipOpen));
    /* ---------------------------------------------------------------- */

    // MODAL FUNCTIONS

    /* ---------------------------------------------------------------- */
    // ADD MODAL SHOW/CLOSE
    /* ---------------------------------------------------------------- */
    const handleAddShow = () => {
        if (skillSet.length >= 5) {
            toast.error("No more than 5 skills can be added to the Industry Equivalency Section.");
            return;
        };
        setShowAdd(true);
    };
    const handleAddClose = () => {
       setShowAdd(false);
       setSkillName('');
       setPreviousExp('0');
       setCurrentExp('0');
       setValidationErrors([]);
    };
    /* ---------------------------------------------------------------- */
    // EDIT MODAL SHOW/CLOSE
    /* ---------------------------------------------------------------- */
    const handleEditShow = (() => {
            setShowEdit(true);
        });
    const handleEditClose = (() => {
        aquireSkillSet();
        setShowEdit(false);
    });
    /* ---------------------------------------------------------------- */

    // AXIOS FUNCTIONS

    /* ---------------------------------------------------------------- */
    // GET EQUIVALENCY ARRAY
    /* ---------------------------------------------------------------- */
    const aquireSkillSet = (() => {
        axios.get(url + '/equiv/portfolios/all/' + portfolio.id)
            .then(resp => {
                console.log(resp.data);
                let tempSkillSet: Array<Skill> = resp.data;
                let tempMax: number = 0;
                tempSkillSet.forEach(skill => {
                    if (skill.value > tempMax) {
                        tempMax = skill.value;
                    }
                });
                setSkillSet(resp.data);
            })
            .catch(error => {
                console.error(error);
            });
    });
    /* ---------------------------------------------------------------- */
    // ADD EQUIVALENCY SKILL
    /* ---------------------------------------------------------------- */
    const addSkill = (async () => {
        let valid: any = industrySkillValidation(skillName, equivalency);
        if(valid) {
        let newSkill: Skill = {
            id: 0,
            header: skillName,
            value: equivalency,
            portfolio: portfolio
        }
        axios.post(url + '/equiv', newSkill)
            .then(resp => {
                // If POST is successful, add new Skill (with correct data) to the Skill Array
                let tempSkillSet: Array<Skill> = [...skillSet];
                tempSkillSet.push(resp.data);
                setSkillSet(tempSkillSet);
            })
            .catch(error => {
                console.error(error);
            });
        setShowAdd(false);
        setSkillName('');
        setPreviousExp('0');
        setCurrentExp('0');
        setValidationErrors([]);
        } else if (equivalency === 0 && skillName == "") {
            let elements = document.getElementsByClassName("form-control");
            styleInvalidElements(elements);
            const error = ["You must select a skill"];
            setValidationErrors(error);
            return;

        } else if (equivalency > 0) {
            let elements = document.getElementsByName("skillTitle");
            styleInvalidElementsByName(elements);
            const error = ["You must select a skill"];
            setValidationErrors(error);
            return;
        } else {
            let currentExperienceInput = document.getElementsByName("currentExperience");
            styleInvalidElementsByName(currentExperienceInput);
            let previousExperienceInput = document.getElementsByName("previousExperience");
            styleInvalidElementsByName(previousExperienceInput);
            const error = ["You cannot have a skill with zero experience"];
            setValidationErrors(error);
            return;

        }
            setSkillName('');
            setPreviousExp('0');
            setCurrentExp('0');
    });
    /* ---------------------------------------------------------------- */
    // DELETE EQUIVALENCY SKILL
    /* ---------------------------------------------------------------- */
    const handleDelete = async (remSkill: Skill) => {
        axios.delete(url + '/equiv/' + remSkill.id)
            .then(resp => {
                console.log(resp.data);
                let tempSkillSet: Array<Skill> = [...skillSet];
                tempSkillSet.splice(tempSkillSet.indexOf(remSkill), 1);
                setSkillSet(tempSkillSet);
            })
            .catch(error => {
                console.error(error);
            })
    };
    /* ---------------------------------------------------------------- */
    // UPDATE EQUIVALENCY ARRAY
    /* ---------------------------------------------------------------- */
    const updateSkills = () => {
        skillSet.forEach(async (s) => {
            await axios.post(url + '/equiv/' + s.id, s)
                .then((resp) => { })
                .catch((error) => {
                    console.error(error);
                })
        });
        setShowEdit(false);
    }
    /* ---------------------------------------------------------------- */
    // EDIT SKILL <input> CHANGE
    /* ---------------------------------------------------------------- */
    const handleEditChange = (changeType: number, changeSkill: number, newValue: string) => {
        let tempSkillSet = [...skillSet];
        tempSkillSet.forEach((s) => {
            if (s.id == changeSkill) {
                if (changeType === 1) {
                    s.header = newValue;
                }
                if (changeType === 2) {
                    s.value = +newValue;
                    
                }
            }
        });
        setSkillSet(tempSkillSet);
    }
    /* ---------------------------------------------------------------- */

    // STATE HOOKS

    /* ---------------------------------------------------------------- */
    // RUNS ONCE
    /* ---------------------------------------------------------------- */
    useEffect(() => { aquireSkillSet() }, []);
    /* ---------------------------------------------------------------- */
    // RE-CALCULATE MAX EQUIVALENCY
    /* ---------------------------------------------------------------- */
    useEffect(() => {
        // Re-Calculate Max Equivalency Whenever skillSet is changed
        let tempMax: number = 0;
        skillSet.forEach((s) => {
            if (s.value > tempMax) {
                tempMax = s.value;
            }
        })
        setMaxEquivalency(tempMax);
    }, [skillSet]);
    /* ---------------------------------------------------------------- */
    // RE-CALCULATES EQUIVALENCY IN ADD MODAL
    /* ---------------------------------------------------------------- */
    useEffect(() => {
        setEquivalency(+previousExp + +currentExp);
    }, [previousExp, currentExp, equivalency]);
    /* ---------------------------------------------------------------- */

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>
                        Industry Equivalency
                        <QuestionCircle id="card-info" onClick={handleShowDetails} />
                        <Tooltip target="card-info" isOpen={detailsTooltipOpen} toggle={toggleDetails}>Details</Tooltip>
                        {skillSet.length > 0 && <Pencil id="edit-equivalency" onClick={handleEditShow}/>}
                        {skillSet.length == 0 && <div id="edit-equivalency"></div>}
                        <Tooltip target="edit-equivalency" isOpen={editTooltipOpen} toggle={toggleEdit}>Edit</Tooltip>
                        <PlusCircle id="add-equivalency" onClick={handleAddShow} style={{marginRight: "10px"}} />
                        <Tooltip target="add-equivalency" isOpen={addTooltipOpen} toggle={toggleAdd}>Add Industry Equivalency</Tooltip>
                    </h4>
                </Card.Header>
                <Modal show={showAdd} onHide={handleAddClose} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Add a Skill</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="skillTitle"><h6>Skill Title</h6></label>
                                <select
                                    className="form-control"
                                    name="skillTitle"
                                    value={skillName}
                                    onChange={(ev) => { setSkillName(ev.target.value); }}>
                                    {titleOptions.map((o) => (
                                        <option value={o.value} disabled={o.disabledStatus} key={o.value}>{o.labelText}</option>
                                    ))}
                                </select>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="previousExperience"><h6>How much experience did you have with this skill before starting at Revature?</h6></label>
                                <select
                                    className="form-control"
                                    name="previousExperience"
                                    value={previousExp}
                                    onChange={(ev) => { setPreviousExp(ev.target.value); }}>
                                    {prevExpOption.map((o) => (
                                        <option value={o.value} disabled={o.disabledStatus} key={o.value}>{o.labelText}</option>
                                    ))}
                                </select>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="currentExperience"><h6>How much project work involved this skill during your training at Revature?</h6></label>
                                <select
                                    className="form-control"
                                    name="currentExperience"
                                    value={currentExp}
                                    onChange={(ev) => { setCurrentExp(ev.target.value); }}>
                                    {currExpOption.map((o) => (
                                        <option value={o.value} disabled={o.disabledStatus} key={o.value}>{o.labelText}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group"><input type="hidden" className="form-control" name="equivalencyValue" value={equivalency} readOnly /></div>
                        </form>
                        <ValidationMsg errors={validationErrors}></ValidationMsg>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleAddClose}>Close</Button>
                        <Button variant="primary" className="oButton" onClick={addSkill}>Add</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showEdit} onHide={handleEditClose} backdrop="Static">
                    <Modal.Header>
                        <Modal.Title>Edit Your Skills</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <table>
                                <tr>
                                    <th>Skill Name</th>
                                    <th>Industry Equivalency</th>
                                </tr>
                                {skillSet.map((s) => (
                                    <tr key={s.id}>
                                        <td>
                                            <select
                                                className="form-control"
                                                value={s.header}
                                                onChange={(ev) => { handleEditChange(1, s.id, ev.target.value) }}>
                                                {titleOptions.map((o) => (
                                                    <option value={o.value} disabled={o.disabledStatus} key={o.value}>{o.labelText}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                className="form-control"
                                                type="number"
                                                step="1"
                                                min="3"
                                                max = "24"
                                                value={s.value}
                                                onChange={(ev) => { handleEditChange(2, s.id, ev.target.value) }} />
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleEditClose}>Close</Button>
                        <Button variant="primary" className="oButton" onClick={updateSkills}>Update</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showDetails} onHide={handleCloseDetails}>
                    <Modal.Header>
                        <Modal.Title>Details</Modal.Title>
                        <XCircle id="work-experience-details" onClick={handleCloseDetails}/>
                    </Modal.Header>
                    <ModalBody>
                        <p>
                            This section will show your industry equivalency in certain skills.
                            <br/>
                            <br/>
                            Select a skill and answer two questions to generate values for the section.
                        </p>
                    </ModalBody>
                </Modal>
                <Card.Body>
                    <Card.Text>
                        <div className="row" style={{ height: "220px" }}>
                            {skillSet.map((s) => (
                                <div className="col-sm m-2 fill-box justify-content-center" key={s.id}>
                                    <h5 className={"tall-text p-2 ring-" + Math.round(s.value * 10 / maxEquivalency)}>{s.value}</h5>
                                    <h5 className="eq-label-text">{s.header} <XCircle id="delete-equivalency" className="text-danger" onClick={() => handleDelete(s)} /></h5>
                                </div>
                            ))}
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default IndustryEquivalency;
