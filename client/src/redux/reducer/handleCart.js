import axios from "axios"
import getUserFromCache from "../../utils/getUserFromCache"

const updateCartInDB = async (product_id,qty) =>{
    const user = getUserFromCache()
    if(user){
        axios.post(process.env.REACT_APP_SERVER_URL + "/api/updateCart", {product_id, username:user,qty})
    }
}

const deleteFromCartDB = async (product_id) =>{
    const user = getUserFromCache()
    if(user){
        axios.post(process.env.REACT_APP_SERVER_URL + "/api/deleteFromCart", {product_id, username:user})
    }
}

const cart = []

const handleCart = (state=cart, action) =>{
    const product = action.payload
    switch(action.type){
        case "ADDITEM":
            // Check if product already in cart
            const exist = state.find((x) => x.product_id === product.product_id)
            if(exist){
                // Increase the quantity
                updateCartInDB(exist.product_id, exist.qty + 1)
                return state.map((x)=>x.product_id ===product.product_id?{...x, qty: x.qty+1}:x)
            }
            else{
                updateCartInDB(product.product_id, 1)
                return [...state, {...product, qty:1}]
            }
        case "DELITEM":
            const exist2 = state.find((x) => x.product_id === product.product_id)
            if(exist2.qty === 1){
                deleteFromCartDB(product.product_id)
                return state.filter((x)=>x.product_id!==exist2.product_id)
            }
            else{
                updateCartInDB(exist2.product_id, exist2.qty - 1)
                return state.map((x)=> x.product_id===product.product_id?{...x, qty:x.qty-1}:x)
            }
        case "SETCART":
            return action.payload
        case "CLEARCART":
            return []
        default:
            return state
    }
}

export default handleCart