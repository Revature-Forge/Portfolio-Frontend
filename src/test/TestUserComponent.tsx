import { useCookies } from 'react-cookie';


export let testAdminUser = {id: 22, name: "Jurgen Holls", password: "pass", admin: true};
export let testGeneralUser = {id: 25, name: "John Doe", password: "pass", admin: false};
export let testPortfolioList = [{
    id: 2,
    name: "Stack Full Engineer",
    user: "John Doe",
    submitted: false,
    approved: false,
    reviewed: false,
    feedback: ""
},{
    id: 3,
    name: "DevOps Engineer",
    user: "Jane Doe",
    submitted: true,
    approved: false,
    reviewed: false,
    feedback: ""
},{
    id: 4,
    name: "Stack Full Engineer",
    user: "John Doe",
    submitted: false,
    approved: false,
    reviewed: false,
    feedback: ""
}]

export let fullPortfolioTestObj = { // test portfolio obj built for convenience
    aboutMe: {
        id: 1,
        bio: "This is my test bio. Can't you tell I'm a full stack developer? -_0",
        email: "test@email.com",
        phone: "123-456-7890"
    },
    certificates: [{
        id: 10,
        name: "Java Certified",
        certId: "999",
        issuedBy: "Java peeps",
        issuedOn: "01/01/2000",
        publicUrl: "https://www.youtube.com"
    },{
        id: 11,
        name: "SQL Certified",
        certId: "MSQL-099",
        issuedBy: "Microsoft",
        issuedOn: "01/22/2019",
        publicUrl: "https://www.microsoft.com/en-us/?ql=5"
    }],
    education: [{
        id: 22,
        university: "Good Uni of USA",
        degree: "Biology",
        graduationDate: "01/02/2015",
        gpa: 3.88,
        logoUrl: "http://phandroid.s3.amazonaws.com/wp-content/uploads/2014/07/USA-Logo.png"
    }],
    honor: [{
        id: "15",
        description: "Super hero that kinda helped save the world.",
        dateReceived: "23/06/2011",
        receivedFrom: "My fans",
        title: "Ironman Award",
    }],
    equivalency: [{
        id: 1,
        header: "Java",
        value: 7
    },{
        id: 2,
        header: "Spring Boot",
        value: 4
    },{
        id: 3,
        header: "AWS",
        value: 3
    },{
        id: 45,
        header: "Python",
        value: 18
    },{
        id: 4,
        header: "SQL",
        value: 12
    }],
    otherWorkExperience: [{
        id: 1,
        description: "Moving Blocks",
        employer: "Box Inc.",
        date: "01/01/2016 - 31/12/2016",
        technologies: "Excel, Forklift",
        responsibilities: "Moving Blocks Correctly",
        title: "Block Mover"
    },{
        id: 3,
        description: "Moving Rocks",
        employer: "Rocks Ltd.",
        date: "01/01/2017 - 31/12/2017",
        technologies: "Excel, Crane",
        responsibilities: "Moving Rocks Correctly",
        title: "Rock Mover"
    }],
    projects: [{
        id: 1,
        name: "TensorFlow",
        description: "A machine learning library.",
        responsibilities: "Checking for bugs under the rocks.",
        technologies: "Python, NumPy",
        respositoryUrl: "https://github.com/tensorflow/tensorflow",
        workProducts: "Something goes here?"
    },{
        id: 2,
        name: "Space Station 13",
        description: "A round-based roleplaying game.",
        responsibilities: "Cleaning code blocks.",
        technologies: "Dream Maker(DM)",
        respositoryUrl: "https://github.com/tgstation/tgstation",
        workProducts: "Something goes here?"
    }],
    workExperience: [{
        id: 101,
        description: "Writing Unit Tests for Bank of America",
        employer: "Bank of America",
        startDate: "08/15/2021",
        endDate: "Current",
        technologies: "Python, JUnit, JavaScript, React, Jest, Node",
        responsibilities: "Write tests, attend meetings, find bugs",
        tools: "Computer",
        title: "Software Tester"
    }]

}


export function AdminUserTestComponent() {
    const [, setCookies] = useCookies();
    setCookies('admin', testAdminUser, {path: "/"});
    return <> </>;
}

export function GeneralUserTestComponent() {
    const [, setCookies] = useCookies();
    setCookies('user', testGeneralUser, {path: "/"});
    return <> </>;
}

export function PortfolioTestComponent({portfolioIndex} : {portfolioIndex: number}) {
    const [, setCookies] = useCookies();
    setCookies('portfolio', testPortfolioList[portfolioIndex], {path: "/"});
    return <> </>;
}