export const initialState = {
    cart: {} 
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            return {
                ...state,
                cart: {
                    ...state.cart,
                    [action.payload.id]: {
                        ...action.payload, 
                        quantity: (state.cart[action.payload.id]?.quantity || 0) + action.payload.quantity
                    }
                }
            };
        }
        case "REMOVE_FROM_CART": {
            const updatedCart = { ...state.cart };
            delete updatedCart[action.payload.id];  // Remove item by ID
            
            return { ...state, cart: updatedCart };
        }
        case "RESET_CART":
            return initialState;
        default:
            return state;
    }
};
