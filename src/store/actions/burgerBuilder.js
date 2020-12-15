import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

//this is an async call.... using thunk as it will reach out to firebase DB
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then( response => {
            dispatch(setIngredients(response.data));
        })
        .catch( error => {
            dispatch(fetchIngredientsFailed())
        })
    };
};

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};