import { combineReducers } from 'redux';
import writeFile from "./fileStream";

const productsReducer = (state = [], action) => {
    if (action.type === "ADD_PRODUCT") {
        const newState = [
            ...state,
            [
                action.name.replace("&quot;", "\"").replace("&quot;", "\""),
                parseFloat(action.protein),
                parseFloat(action.carbo),
                parseFloat(action.fat),
                parseFloat(action.portion),
                parseFloat(action.protein * 4.0) + (parseFloat(action.carbo) * 4.0) + (parseFloat(action.fat) * 9.0),
                action.hash
            ]
        ];

        if (action.localSave)
            writeFile("products.json", JSON.stringify(newState));

        return newState;
    } else if (action.type == "ADD_PRODUCTS") {

        writeFile("products.json", JSON.stringify(state));


        return state;
    } else if (action.type === "ADD_PRODUCT_ID") {
        const newState = [...state, action.product];

        return newState;
    } else return state;
};

const userDataReducer = (
    state = {
        bmr: {
            age: 21,
            mass: 75,
            height: 175,
            target: 0,
            activity: 1.2,
            gender: 5
        },
        history: [],
        today: {
            protein: 0,
            carbo: 0,
            fat: 0,
            date: ""
        },
        progress: []
    },
    action
) => {
    if (action.type === "SET_BMR") {
        const newState = {
            ...state,
            bmr: action.bmr
        };

        if (action.localSave)
            writeFile("user_data.json", JSON.stringify(newState));

        return newState;
    } else if (action.type === "SET_MASS") {
        console.log("Set mass to "+action.mass);
        const newState = {
            ...state,
            bmr: {
                ...state.bmr,
                mass: action.mass
            }
        }
        console.log(JSON.stringify(newState));

        if (action.localSave)
            writeFile("user_data.json", JSON.stringify(newState));

        return newState;
    } else if (action.type === "ADD_PROGRESS") {
        const newState = {
            ...state,
            progress: [...state.progress, [action.date, action.mass]]
        };

        if (action.localSave)
            writeFile("user_data.json", JSON.stringify(newState));

        return newState;
    } else if (action.type === "ADD_HISTORY") {
        const newState = {
            ...state,
            history: [...state.history, [action.date, action.kcal]]
        };

        if (action.localSave)
            writeFile("user_data.json", JSON.stringify(newState));

        return newState;
    } else if (action.type === "SET_TODAY") {
        const newState = {
            ...state,
            today: {
                protein: action.protein,
                carbo: action.carbo,
                fat: action.fat,
                date: action.date
            }
        };

        if (action.localSave)
            writeFile("user_data.json", JSON.stringify(newState));

        return newState;
    } else if (action.type === "ADD_TODAY") {
        const newState = {
            ...state,
            today: {
                ...state.today,
                protein: state.today.protein + action.protein,
                carbo: state.today.carbo + action.carbo,
                fat: state.today.fat + action.fat
            }
        };
        writeFile("user_data.json", JSON.stringify(newState));

        return newState;
    } else if (action.type === "INIT") {
        writeFile("user_data.json", JSON.stringify(state));
        return state;
    } else return state;
};

const appReducer = (
    state = {
        block: true
    },
    action
) => {
    if (action.type === "BLOCK_MENU") {
        const newState = {
            ...state,
            block: action.block
        };

        return newState;
    } else return state;
};

const rootReducer = () => combineReducers({
    userData: userDataReducer,
    products: productsReducer,
    app: appReducer
})


export default rootReducer;