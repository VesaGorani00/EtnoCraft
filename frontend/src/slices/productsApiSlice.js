import { PRODUCT_MERCHANTS_URL, PRODUCTS_URL , UPLOAD_URL} from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ pageNumber, keyword }) => ({
                url: PRODUCTS_URL,
                params: {
                    pageNumber,
                    keyword,
                },
            }),
            providesTags:["Products"],
            keepUnusedDataFor: 5,
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
              url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
            providesTags:["Products"]
        }),
        
        createProduct: builder.mutation({
            query: () =>({
                url:PRODUCTS_URL,
                method:"POST"
            }),
            invalidatesTags:["Product"]
        }),
        createMerchantProduct: builder.mutation({
            query: () =>({
                url:PRODUCT_MERCHANTS_URL,
                method:"POST"
            }),
            invalidatesTags:["Product"]
        }),
        updateProduct:builder.mutation({ 
            query:(data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method:"PUT",
                body:data,
            }),
            invalidatesTags:["Products"]
        }),
        updateMerchantProduct:builder.mutation({ 
            query:(data) => ({
                url: `${PRODUCT_MERCHANTS_URL}/${data.productId}`,
                method:"PUT",
                body:data,
            }),
            invalidatesTags:["Products"]
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data,

            }),
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE'
            }),
        }),
        
        deleteMerchantProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCT_MERCHANTS_URL}/${productId}`,
                method: 'DELETE'
            }),
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        getTopProducts:builder.query({
            query: () => ({
                url:`${PRODUCTS_URL}/top`,
            }),
            keepUnusedDataFor:5,
        }),
        //////////
        getMerchantProducts: builder.query({
            query: ({ pageNumber, keyword }) => ({
                url: PRODUCT_MERCHANTS_URL,
                params: {
                    pageNumber,
                    keyword,
                },
            }),
            providesTags:["Products"],
            keepUnusedDataFor: 5,
        }),
    }),
});

export const {
     useGetProductsQuery,
     useGetProductDetailsQuery,
     useCreateProductMutation,
     useUpdateProductMutation,
     useUploadProductImageMutation,
     useDeleteProductMutation,
     useCreateReviewMutation,
     useGetTopProductsQuery,
     ////
     useGetMerchantProductsQuery,
     useCreateMerchantProductMutation,
     useUpdateMerchantProductMutation,
     useDeleteMerchantProductMutation,
    } = productsApiSlice;