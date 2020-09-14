const initState = {
    items: [],
}

export const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            console.log("item added to cart");
            const newItem = {
                model: action.dreamcatcher.model,
                amount: parseInt(action.amount),
                price: action.dreamcatcher.price,
                img: action.dreamcatcher.img,

            }
            const itemIndex = state.items.findIndex(item => item.model === newItem.model)
            //Updating the amount field if the model is already in the array.
            if (itemIndex >= 0) {
                let newArray = [...state.items];
                newArray[itemIndex] = {
                    ...newArray[itemIndex],
                    amount: newArray[itemIndex].amount + newItem.amount,
                }
                return {
                    ...state,
                    items: [...newArray]
                }
            }

            return {
                ...state,
                items: [...state.items, newItem]
            }
        }
        case 'REMOVE_FROM_CART': console.log("item removed from cart");
            return state;
        default: return state;
    }

}