import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';

import 'axios';
import * as rcookies from 'react-cookie';

import {testPortfolioList, fullPortfolioTestObj, testAdminUser} from "./TestUserComponent";

// Import Portfolio component viewers
import AboutMeView from "../components/ViewPortfolio/AboutMeView";
import CertificationView from "../components/ViewPortfolio/CertificationView";
import EducationView from "../components/ViewPortfolio/EducationView";
import HonorAwardView from "../components/ViewPortfolio/HonorAwardView";
import IndustryEquivalencyView from '../components/ViewPortfolio/IndustryEquivalencyView';
import OtherWorkExperienceView from "../components/ViewPortfolio/OtherWorkExperienceView";
import ProjectView from "../components/ViewPortfolio/ProjectView";

// amazing resource for understanding jest
// https://dev.to/zaklaughton/the-only-3-steps-you-need-to-mock-an-api-call-in-jest-39mb

const pIndex = 0; // select the index of the portfolio you want to view from testPortfolioList

// mock react-cookie and define useCookies as a mock function
jest.mock('react-cookie', () => ({
    useCookies: jest.fn()
}));

// mock axios
jest.mock('axios');

beforeEach(() => {
    jest.spyOn(rcookies, 'useCookies').mockImplementation(() => {
        return [{
            id: 9999,
            admin: testAdminUser,
            portfolio: testPortfolioList[pIndex]
        }, function () {
            console.log('updateCookie function called.')
        }, function () {
            console.log('removeCookie function called.')
        }];
    })

})

afterEach(() => {
    jest.clearAllMocks();
})

afterAll(() => {
    jest.resetAllMocks();
})

describe('Test component sections for viewing portfolio', () => {
    

    test('Check if AboutMeView component is functioning and visible.', async () => {
        const axios = require('axios');
        axios.get.mockImplementationOnce((longUrl: string)  => {
            return Promise.resolve({data: fullPortfolioTestObj.aboutMe});
        })
        
        const { getByText } = render(<AboutMeView />);
        const title = getByText("About Me");
                
        expect(await screen.findByText("About Me")).toBeVisible();

        expect(title).toHaveTextContent("About Me");
        expect(title).not.toHaveTextContent("About You");

        await waitFor(() => {
            const bio = getByText(fullPortfolioTestObj.aboutMe.bio);
            expect(bio).toHaveTextContent(fullPortfolioTestObj.aboutMe.bio);
            expect(bio).not.toHaveTextContent("I Don't Have This Text");
            expect(bio).toBeVisible();
        })

        await waitFor(() => {
            const email = getByText("Email: " + fullPortfolioTestObj.aboutMe.email);
            expect(email).toHaveTextContent("Email: " + fullPortfolioTestObj.aboutMe.email);
            expect(email).toBeVisible();
        })

        await waitFor(() => {
            const phone = getByText("Phone: " + fullPortfolioTestObj.aboutMe.phone);
            expect(phone).toHaveTextContent("Phone: " + fullPortfolioTestObj.aboutMe.phone);
            expect(phone).toBeVisible();
        })
        
        
    })

    test('Check if CertificateView component is functioning and visible.', async () => {
        const axios = require('axios');
        axios.get.mockImplementationOnce((longUrl: string)  => {
            return Promise.resolve({data: fullPortfolioTestObj.certificates});
        })
        
        const { getByText, getAllByTestId } = render(<CertificationView />);
        const title = getByText("Certification");
                
        expect(await title).toBeVisible();

        await waitFor(() => {
            const card = getAllByTestId("card");

            expect(card.length).toBe(fullPortfolioTestObj.certificates.length);

            for (let i = 0; i < card.length; i++) {
                expect(card[i]).toBeVisible();   
                let name = getByText(fullPortfolioTestObj.certificates[i].name, {exact: false});
                expect(name).toHaveTextContent(`Certification Name: ${fullPortfolioTestObj.certificates[i].name}`); 
                expect(name).toBeVisible();
                expect(card[i]).toContainElement(name);      
                
                let issuedBy = getByText(fullPortfolioTestObj.certificates[i].issuedBy, {exact: false});
                expect(issuedBy).toHaveTextContent(`Issued By: ${fullPortfolioTestObj.certificates[i].issuedBy}`);
                expect(issuedBy).not.toHaveTextContent(`Issued On: ${fullPortfolioTestObj.certificates[i].issuedBy}`); 
                expect(issuedBy).toBeVisible();
                expect(card[i]).toContainElement(issuedBy); 

                let certId = getByText(fullPortfolioTestObj.certificates[i].certId, {exact: false});
                expect(certId).toHaveTextContent(`Certification ID: ${fullPortfolioTestObj.certificates[i].certId}`); 
                expect(certId).toBeVisible(); 
                expect(card[i]).toContainElement(certId);
                
                let issuedOn = getByText(fullPortfolioTestObj.certificates[i].issuedOn, {exact: false});
                expect(issuedOn).toHaveTextContent(`Issued On: ${fullPortfolioTestObj.certificates[i].issuedOn}`); 
                expect(issuedOn).not.toHaveTextContent(`Issued By: ${fullPortfolioTestObj.certificates[i].issuedOn}`); 
                expect(issuedOn).toBeVisible(); 
                expect(card[i]).toContainElement(issuedOn);
            }

            
        })

        
        
    })

    test('Check if EducationView component is functioning and visible.', async () => {
        const axios = require('axios');
        axios.get.mockImplementationOnce((longUrl: string)  => {
            return Promise.resolve({data: fullPortfolioTestObj.education});
        })
        
        const { getByText, getAllByTestId } = render(<EducationView />);
        const title = getByText("Education");
                
        expect(await title).toBeVisible();

        await waitFor(() => {
            const card = getAllByTestId("card");
            const imgs = getAllByTestId("eduLogo");

            expect(card.length).toBe(fullPortfolioTestObj.education.length);

            for (let i = 0; i < card.length; i++) {
                expect(card[i]).toBeVisible();   
                let degree = getByText(fullPortfolioTestObj.education[i].degree, {exact: false});
                expect(degree).toHaveTextContent(`Degree: ${fullPortfolioTestObj.education[i].degree}`); 
                expect(degree).toBeVisible();
                expect(card[i]).toContainElement(degree);    
                
                let uni = getByText(fullPortfolioTestObj.education[i].university, {exact: false});
                expect(uni).toHaveTextContent(`University: ${fullPortfolioTestObj.education[i].university}`); 
                expect(uni).toBeVisible();
                expect(card[i]).toContainElement(uni); 

                let gpa = getByText(fullPortfolioTestObj.education[i].gpa, {exact: false});
                expect(gpa).toHaveTextContent(`GPA: ${fullPortfolioTestObj.education[i].gpa}`); 
                expect(gpa).toBeVisible();
                expect(card[i]).toContainElement(gpa);
                
                expect(imgs[i]).toBeVisible();
            }

            
        })

        
        
    })

    test('Check if HonorAwardView component is functioning and visible.', async () => {
        const axios = require('axios');
        axios.get.mockImplementationOnce((longUrl: string)  => {
            return Promise.resolve({data: fullPortfolioTestObj.honor});
        })
        
        const { getByText, getAllByTestId } = render(<HonorAwardView />);
        const title = getByText("Honors and Awards");
                
        expect(await title).toBeVisible();

        await waitFor(() => {
            const card = getAllByTestId("card");

            expect(card.length).toBe(fullPortfolioTestObj.honor.length);

            for (let i = 0; i < card.length; i++) {
                expect(card[i]).toBeVisible(); 
                let name = getByText(fullPortfolioTestObj.honor[i].title, {exact: false});
                expect(name).toHaveTextContent(`${fullPortfolioTestObj.honor[i].title}`); 
                expect(name).toBeVisible();
                expect(card[i]).toContainElement(name);
                
                let desc = getByText(fullPortfolioTestObj.honor[i].description, {exact: false});
                expect(desc).toHaveTextContent(`${fullPortfolioTestObj.honor[i].description}`); 
                expect(desc).toBeVisible();
                expect(card[i]).toContainElement(desc); 

                let recieved = getByText(fullPortfolioTestObj.honor[i].receivedFrom, {exact: false});
                expect(recieved).toHaveTextContent(`${fullPortfolioTestObj.honor[i].receivedFrom}`); 
                expect(recieved).toBeVisible();
                expect(card[i]).toContainElement(recieved);
                
            }

            
        })

        
        
    })

    test('Check if IndustryEquivalencyView component is functioning and visible.', async () => {
        const axios = require('axios');
        axios.get.mockImplementationOnce((longUrl: string)  => {
            return Promise.resolve({data: fullPortfolioTestObj.equivalency});
        })
        
        const { getByText, getAllByTestId } = render(<IndustryEquivalencyView />);
        const title = getByText("Industry Equivalency");
                
        expect(await title).toBeVisible();

        await waitFor(() => {
            const circles = getAllByTestId("equivCircle");
            const values = getAllByTestId("value");
            const headers = getAllByTestId("header");

            expect(circles.length).toBe(fullPortfolioTestObj.equivalency.length);

            for (let i = 0; i < circles.length; i++) {
                expect(circles[i]).toBeVisible(); 
                
                expect(parseInt(values[i].innerHTML)).toBe(fullPortfolioTestObj.equivalency[i].value);
                expect(values[i]).toBeVisible();
                expect(circles[i]).toContainElement(values[i]);

                expect(headers[i].innerHTML).toBe(fullPortfolioTestObj.equivalency[i].header);
                expect(headers[i]).toBeVisible();
                expect(circles[i]).toContainElement(headers[i]);
            }

            
        })

        
        
    })

    test('Check if OtherWorkExperienceView component is functioning and visible.', async () => {
        const axios = require('axios');
        axios.get.mockImplementationOnce((longUrl: string)  => {
            return Promise.resolve({data: fullPortfolioTestObj.otherWorkExperience});
        })
        
        const { getByText, getAllByTestId } = render(<OtherWorkExperienceView />);
        const title = getByText("Other Work Experience");
                
        expect(await title).toBeVisible();

        await waitFor(() => {
            const card = getAllByTestId("card");

            expect(card.length).toBe(fullPortfolioTestObj.otherWorkExperience.length);

            for (let i = 0; i < card.length; i++) {
                expect(card[i]).toBeVisible(); 

                let content = getByText(fullPortfolioTestObj.otherWorkExperience[i].title, {exact: false});
                expect(card[i]).toContainElement(content);

                expect(content).toHaveTextContent(fullPortfolioTestObj.otherWorkExperience[i].title);
                expect(content).toHaveTextContent(fullPortfolioTestObj.otherWorkExperience[i].description);
                expect(content).toHaveTextContent(fullPortfolioTestObj.otherWorkExperience[i].date);
                expect(content).toHaveTextContent(fullPortfolioTestObj.otherWorkExperience[i].responsibilities);
                expect(content).toHaveTextContent(fullPortfolioTestObj.otherWorkExperience[i].technologies);
                expect(content).toBeVisible(); 
                
                
            }

            
        })

        
        
    })

    test('Check if ProjectView component is functioning and visible.', async () => {
        const axios = require('axios');
        axios.get.mockImplementationOnce((longUrl: string)  => {
            return Promise.resolve({data: fullPortfolioTestObj.projects});
        })
        
        const { getByText, getAllByTestId } = render(<ProjectView />);
        const title = getByText("Project");
                
        expect(await title).toBeVisible();

        await waitFor(() => {
            const card = getAllByTestId("card");

            expect(card.length).toBe(fullPortfolioTestObj.projects.length);

            for (let i = 0; i < card.length; i++) {
                expect(card[i]).toBeVisible(); 
                let name = getByText(fullPortfolioTestObj.projects[i].name);
                expect(name).toHaveTextContent(`${fullPortfolioTestObj.projects[i].name}`); 
                expect(name).toBeVisible(); 
                expect(card[i]).toContainElement(name);
                
                let desc = getByText(fullPortfolioTestObj.projects[i].description, {exact: false});
                expect(desc).toHaveTextContent(`${fullPortfolioTestObj.projects[i].description}`); 
                expect(desc).toBeVisible();    
                expect(card[i]).toContainElement(desc);

                let tech = getByText(fullPortfolioTestObj.projects[i].technologies, {exact: false});
                expect(tech).toHaveTextContent(`${fullPortfolioTestObj.projects[i].technologies}`); 
                expect(tech).toBeVisible();    
                expect(card[i]).toContainElement(tech);

                let repo = getByText(fullPortfolioTestObj.projects[i].respositoryUrl, {exact: false});
                expect(repo).toHaveTextContent(`${fullPortfolioTestObj.projects[i].respositoryUrl}`); 
                expect(repo).toBeVisible();    
                expect(card[i]).toContainElement(repo);

                let responsibilities = getByText(fullPortfolioTestObj.projects[i].responsibilities, {exact: false});
                expect(responsibilities).toHaveTextContent(`${fullPortfolioTestObj.projects[i].responsibilities}`); 
                expect(responsibilities).toBeVisible();    
                expect(card[i]).toContainElement(responsibilities);

            }

            
        })

        
        
    })


})
