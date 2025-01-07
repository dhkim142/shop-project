import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredProducts: []                                        //filter된 상품 배열
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        FILTER_BY_CATEGORY: (state, action) => {
            const { products, category } = action.payload;
            let tempProducts = [];
            if (category === 'All') {
                tempProducts = products;
            }
            else {
                tempProducts = products.filter(
                    (product) => product.category === category
                )
            }

            state.filteredProducts = tempProducts
        },

        FILTER_BY_BRAND: (state, action) => {
            const { products, brand } = action.payload;
            let tempProducts = [];
            if (brand === 'All') {
                tempProducts = products;
            }
            else {
                tempProducts = products.filter(
                    (product) => product.brand === brand
                )
            }
            state.filteredProducts = tempProducts;
        },

        FILTER_BY_PRICE: (staet, action) => {
            const { products, price } = action.payload;
            let tempProducts = [];

            tempProducts = products.filter(product => product.price <= price);                  //product의 가격에서 price보다 작은 값을 가진 상품

            state.filteredProducts = tempProducts;
        },
        // 위에 코드는 각각 독립적인 행동일 때, 아래 코드는 모든 필터링이 적용된 상품
        FILTER_BY: (state, action) => {
            const { products, price, brand, category } = action.payload;
            let tempProducts = [];

            if (category === 'All') {
                tempProducts = products;
            }
            else {
                tempProducts = products.filter((product) => product.category === category)
            }

            if (brand === 'All') {
                tempProducts = tempProducts;                                                    //category 필터링을 적용하기 위해서 category에서 필터링 된 상품들을 가져옴
            }
            else {
                tempProducts = tempProducts.filter((product) => product.brand === brand)
            }

            tempProducts = tempProducts.filter((product) => product.price <= price);

            state.filteredProducts = tempProducts;                                              //모든 필터링이 적용된 상품을 업데이트
        }
    }
});

export const { FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE, FILTER_BY } = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;