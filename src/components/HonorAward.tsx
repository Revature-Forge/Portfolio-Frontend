import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Card, Button, Modal, ModalBody } from 'react-bootstrap'
import { QuestionCircle, PlusCircle, XCircle } from 'react-bootstrap-icons'
import { Tooltip } from 'reactstrap'
import axios from 'axios'
import '../css/HonorAwards.css'
import { CSSProperties } from 'react'
import {url} from "../api/api";
import awardValidation from './validation/AwardValidation'
import styleInvalidElements from "./validation/InvalidFormHandling";
import ValidationMsg from './validation/ValidationMsg'

const HonorAwards = () => {
    // Cookies
    //*****************************/
    const [cookies] = useCookies()
    const portfolio = cookies['portfolio']
    //*****************************/

    // Add Honor&Award hide
    //*************************************************************/
    const [showAddExperience, setShowExperience] = useState(false)
    const handleCloseAddExperience = () => setShowExperience(false)
    const handleShowAddExperience = () => setShowExperience(true)
    //*************************************************************/

    // Card details Modal show and hide
    //****************************************************/
    const [showDetails, setShowDetails] = useState(false);
    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails= () => setShowDetails(true);
    //***************************************************/

    // Update Modal show and hide
    //**************************************************************************/
    const [showUpdateExperience, setShowUpdateExperience] = useState(false)
    const handleCloseUpdateExperience = () => setShowUpdateExperience(false)
    const handleShowUpdateExperience = () => setShowUpdateExperience(true)
    //**************************************************************************/

    // Delete Modal show and hide
    //*****************************************************/
    const [showDelete, setShowDelete] = useState(false)
    const handleCloseDelete = () => setShowDelete(false)
    const handleShowDelete = () => setShowDelete(true)
    //*****************************************************/

    // Tooltip for add and details buttons
    //***********************************************************************/
    const [addTooltipOpen, setAddTooltipOpen] = useState(false)
    const toggleAdd = () => setAddTooltipOpen(!addTooltipOpen)
    const [detailsTooltipOpen, setDetailsTooltipOpen] = useState(false)
    const toggleDetails = () => setDetailsTooltipOpen(!detailsTooltipOpen)
     //***********************************************************************/

    // Add honor state handling
    //***************************************************/
    const [title, setAwardTitle] = useState('')
    const [description, setDesc] = useState('')
    const [receivedFrom, setRecefrom] = useState('')
    const [dateReceived, setReceon] = useState('')
    const [id, setId] = useState('')

    //***************************************************/


    const [validationErrors, setValidationErrors] =  useState<string[]>([]);


    // Get data from data base
    //***********************************************************/
    const getData = async () => {
        axios.get(url + "/honor/portfolio/"+cookies['portfolio'].id)

        .then(response => {
            createHonorAward(response.data)
            console.log(response.data)

        })
        .catch(error => {
            console.log("error")
        })
    }
    useEffect(() => {getData()}, [])
    //***********************************************************/

    //Render Honor Award on page
    //*********************************************************************/
    const createHonorAward = (data: any) => {
        const bodyHeaders: Array<string> = [
            "Description",
            "Received From",
            "Received On"
        ]

        for (let index = 0; index < data.length; index++) {
            let headerNum: number = 1
            let honorawards = document.querySelector(".honorawards")

            let card = document.createElement("div")
            let cardHeader = document.createElement("div")
            let cardBody = document.createElement("div")

            let editDiv = document.createElement("div")
            let editButton = document.createElement("button")
            let deleteButton = document.createElement("button")

            card.setAttribute("class", "card")
            cardHeader.setAttribute("class", "card-header")
            cardBody.setAttribute("class", "card-body")
            editButton.setAttribute("class", "btn btn-secondary")
            deleteButton.setAttribute("class", "btn btn-danger")

            card.appendChild(cardHeader)
            card.appendChild(cardBody)
            cardHeader.appendChild(editDiv)

            // Store header content
            //***********************************************************************************************************************************/
            let headerContent: Array<string> = []
            headerContent.push(data[index].title)
            console.log("headercontent" + data[index].title)
            //***********************************************************************************************************************************/

            //Store body content
            //***********************************************/
            let bodyContent: Array<string> = []
            bodyContent.push(data[index].description)
            bodyContent.push(data[index].receivedFrom)
            const months: Array<string> = [
                "January", "February", 
                "March", "April", "May", 
                "June", "July", "August",
                "September", "October", 
                "November", "December"
            ]
            let RecDate = new Date(data[index].dateReceived)
            let RDate = RecDate.getDate()+" " +months[RecDate.getMonth()]  +" "+ RecDate.getFullYear() 
    
            bodyContent.push(RDate)
            //***********************************************/

            for (let element in headerContent) {
                let component = document.createElement("h" + headerNum)
                editDiv.appendChild(editButton)
                editDiv.appendChild(deleteButton)
                editDiv.style.float = "right"

                editButton.innerHTML = "Edit"
                editButton.addEventListener("click", () => {
                    setAwardTitle(data[index].title)
                    setDesc(data[index].description)
                    setRecefrom(data[index].receivedFrom)
                    setReceon(data[index].dateReceived)
                    setId(data[index].id)
                    handleShowUpdateExperience()
                })
                editButton.style.marginRight = "10px"

                deleteButton.innerHTML = "Delete"
                deleteButton.addEventListener("click", () => {
                    setId(data[index].id)
                    handleShowDelete()
                })
                
                cardHeader.appendChild(component)
                component.innerHTML = headerContent[element]
                honorawards?.appendChild(card)

                if(headerNum === 1) {
    //                component.style.fontWeight = "bold"
                } else if(headerNum === 3) {
                    component.style.color = "rgb( 242, 105, 3)"
                }

                cardHeader.style.borderBottom = "5px solid rgb(115, 165, 194)"
                cardHeader.style.backgroundColor = "white" 

                if(Number(honorawards?.childElementCount) > 1) {
                    card.style.marginTop = "50px"
                }
                headerNum++
            }

            for (const element in bodyContent) {
                let bodyHeader = document.createElement("h5")
                let para = document.createElement("p")
                cardBody.appendChild(bodyHeader)
                cardBody.appendChild(para)
                bodyHeader.innerHTML = bodyHeaders[element]
                bodyHeader.style.fontWeight = "bold"
                para.innerHTML = bodyContent[element]
                para.style.whiteSpace = "pre-line"
            }
        } 
    }
    let addButtonStyles: CSSProperties = {
        background: "rgb(242, 105, 3)",
        borderColor: "rgb(242, 105, 3)"}

    //*******************************************************************************************/
    // Delete honor/award from database
    //*******************************************************************************************/
    const handleDelete = (input: any) => {
        axios.delete(url + "/honor/" + input)
        .then(resp => {
            console.log("Delete was successful");
            window.location.reload()
        })
        .catch(error => {
            console.log("error");
        })
    }


    //*********************************************************************/
    // Save data to database
    //*********************************************************************/


    const handleSave = () => {
        if (awardValidation("true", title, description, receivedFrom, dateReceived, portfolio)){
            console.log("awardtitle" + title);

            axios.post(url + "/honor", {
                title,
                description,
                receivedFrom,
                dateReceived,
                portfolio: cookies['portfolio']
    
            })
            .then(resp => {
                console.log(resp.data);
                console.log("honorawards saved succesfully")
                window.location.reload()

            })
            .catch(error => {
                console.log("error")
            })
            setAwardTitle('');
            setDesc('');
            setRecefrom('');
            setReceon('');
            setShowExperience(false)
            setValidationErrors([]);
        }else{
            let inputElements = document.getElementsByClassName("form-input");
            styleInvalidElements(inputElements);
            setValidationErrors(["Please populate the required fields"]);
        }
    }
    //***********************************************************************/
    // Update honor/award from database
    //***********************************************************************/
    const handleUpdate = (input: any) => {
        if (awardValidation(id, title, description, receivedFrom, dateReceived, "true")){
            axios.put(url + "/honor",{
            id,
            title,
            description,
            receivedFrom,
            dateReceived
            })
            .then(resp => {
                console.log("honor updates");
                window.location.reload()
            })
            .catch(error => {
                console.log("error")
            })
            setValidationErrors([]);
        }else{
            let inputElements = document.getElementsByClassName("form-input");
            styleInvalidElements(inputElements);
            setValidationErrors(["Please populate the required fields"]);
        }
    }

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header-honoraward">
                    <h4>
                        Honors & Awards
                        <PlusCircle id="add-honoraward" onClick={handleShowAddExperience}/>
                        <Tooltip target="add-honoraward" isOpen={addTooltipOpen} toggle={toggleAdd}>Add Honors & Awards</Tooltip>
                    </h4>
                </Card.Header>
                <Card.Body id="card-body">
                    <Card.Text className="honorawards"></Card.Text>
                </Card.Body>
            </Card>
            <Modal show={showAddExperience} onHide={handleCloseAddExperience} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Add Awards&Honors</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSave}>
                            <h6>AwardTitle</h6>

                            <input type="text" name="title" className="form-input" required value ={title} onChange={e => setAwardTitle(e.target.value)}/>
                            <h6>Description</h6>
                            <input type="text" name="description" className="form-input honoraward-textarea" required value ={description} onChange={e => setDesc(e.target.value)}/>
                            <h6>ReceivedFrom</h6>
                            <input type="text" name="receivedFrom" className="form-input"  required value ={receivedFrom} onChange={e => setRecefrom(e.target.value)}/>
                            <h6>Received On</h6>
                            <input type="date" name="dateReceived" className="form-input" required value ={dateReceived} onChange={e => setReceon(e.target.value)}/>

                        </form>
                        <ValidationMsg errors={validationErrors}></ValidationMsg>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAddExperience}>Close</Button>
                        <Button variant="primary" style={addButtonStyles} onClick={handleSave}>Add</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showUpdateExperience} onHide={handleCloseUpdateExperience} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Edit Awards&Honors</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                        <h6>AwardTitle</h6>
                            <input type="text" name="awardtitle" className="form-input"  required value ={title} onChange={e => setAwardTitle(e.target.value)}/>
                            <h6>Description</h6>
                            <input type="text" name="description" className="form-input honoraward-textarea" required value ={description} onChange={e => setDesc(e.target.value)}/>
                            <h6>ReceivedFrom</h6>
                            <input type="text" name="receivedFrom" className="form-input"  required value ={receivedFrom} onChange={e => setRecefrom(e.target.value)}/>
                            <h6>Received On</h6>
                            <input type="date" name="Received On" className="form-input"  required value ={dateReceived} onChange={e => setReceon(e.target.value)}/>
                        </form>
                        <ValidationMsg errors={validationErrors}></ValidationMsg>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUpdateExperience}>Close</Button>
                        <Button variant="primary" className="oButton" onClick={() => {handleUpdate(id)}}>Update</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static">
                    <Modal.Header>Delete Warning</Modal.Header>
                    <Modal.Body><p>This will  permanantly delete this info. Are you sure?</p></Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => {handleDelete(id)}}>Yes, Permanantly Delete</Button>
                        <Button variant="secondary" onClick={handleCloseDelete}>Close</Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default HonorAwards
