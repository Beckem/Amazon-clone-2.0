import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const index = state.items.findIndex(basketItem=>basketItem.id===action.payload.id);
      if (index>=0){
        let newBasket = [...state.items];
        if (action.payload.quantity === -1) newBasket[index].quantity++;
        else newBasket[index].quantity = action.payload.quantity;
        state.items=newBasket;
        
      }
      else{
        if (action.payload.quantity===-1) action.payload.quantity = 1;
        state.items = [...state.items, action.payload];
      }
      localStorage.setItem('Basket_Amazon', JSON.stringify(state.items));
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(basketItem=>basketItem.id===action.payload.id);

      let newBasket = [...state.items];
      if (index>=0){
        //the item exist
        newBasket.splice(index,1);
      }else{
        console.warn(`cant remove product (id:${action.payload.id})`);
      }
      state.items=newBasket;
      localStorage.setItem('Basket_Amazon', JSON.stringify(state.items));
    },
    
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total, item)=>total+item.price*item.quantity ,0)
export const selectQuantity = (state) => state.basket.items.reduce((total, item)=>total+(+item.quantity) ,0)
export default basketSlice.reducer;
