// Store/Reducers/favoriteReducer.js

const initialState = { quantityOfItem: [], product: [] }

function manageItem(state = initialState, action) {
    let nextState
    switch (action.type) {
        // Delete a product in the state
        case 'DELETE_PRODUCT':
            action.value.archive = 1
            nextState = {
                ...state,
                product: [...state.product, action.value]
            }
            return nextState || state
        // Change quantity of a product
        case 'ADD_QUANTITY':
            action.value.quantity++
            nextState = {
                ...state,
                product: [...state.product, action.value]
            }
            return nextState || state
        case 'REMOVE_QUANTITY':
            if (action.value.quantity > 0) {
                action.value.quantity--
                nextState = {
                    ...state,
                    product: [...state.product, action.value]
                }
            }

            return nextState || state
        default:
            return state



    }
}

export default manageItem