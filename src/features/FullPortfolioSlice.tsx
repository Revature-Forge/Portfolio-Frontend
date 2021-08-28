import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store/Store';



// export interface FullPortfolio {
//     portfolio: {
// id: number
//         name: String,
//         submitted: boolean,
//         approved: boolean,
//         reviewed: boolean,
//         feedback: any,
//         aboutMe: {
//             id: number,
//             bio: String,
//             email: String,
//             phone: String
//         }
//     }

//     ,
//     certifications: [],
//     educations: [
//         {
//             id: number,
//             university: String,
//             degree: String,
//             graduationDate: String,
//             gpa: number,
//             logoUrl: String
//         }
//     ]

// }

export interface FullPortfolio {
    fullPortfolio: {}

}

const initialState: FullPortfolio = {
    fullPortfolio: {}
    // portfolio: {
    //     "id": 0,
    //     "name": "",
    //     "submitted": false,
    //     "approved": true,
    //     "reviewed": true,
    //     "feedback": null,
    //     "aboutMe": {
    //         "id": 1,
    //         "bio": "test ",
    //         "email": "@mail",
    //         "phone": ""
    //     }
    // },
    // "certifications": [],
    // "educations": [
    //     {
    //         "id": 1,
    //         "university": "",
    //         "degree": "test ",
    //         "graduationDate": "",
    //         "gpa": 0,
    //         "logoUrl": ""
    //     }
    // ]
}

const fullPortfolioSlice = createSlice({
    name: "fullprotfolio",
    initialState,
    reducers: {
        setFullPortfolio(state, action: PayloadAction<any>) {
            state.fullPortfolio = action.payload;
        }
    }
})


export const getPortfolioSelector = (state: RootState) => state.fullPortfolio;
export const { setFullPortfolio } = fullPortfolioSlice.actions;

export default fullPortfolioSlice.reducer;