// For Add Item to Cart
export const addCart = (product) =>{
    return {
        type:"ADDITEM",
        payload:product
    }
}

// For Delete Item to Cart
export const delCart = (product) =>{
    return {
        type:"DELITEM",
        payload:product
    }
}

export const setCart = (cart) =>{
    return {
        type:"SETCART",
        payload:cart
    }
}

export const clearCart = () =>{
    return {
        type:"CLEARCART",
    }
}