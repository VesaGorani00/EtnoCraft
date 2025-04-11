import {apiSlice} from "./apiSlice.js"
import { ORDER_MERCHANTS_URL, ORDERS_URL, PAYPAL_URL } from '../constants.js'



export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        createOrder:builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method:"Post",
                body: {...order}
            })
        }),
        getOrderDetails: builder.query({
            query:(orderId) => ({
            url: `${ORDERS_URL}/${orderId}`
            }),
            keepUnusedDataFor: 5
        }),
        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: {...details},
            }),
        }),
        getPayPalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 5, 
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/mine`,
            }),
            keepUnusedDataFor: 5,
        }),
        getOrders: builder.query({
        query:() => ({
            url: ORDERS_URL
        }),
        keepUnusedDataFor: 5, 
    }),
    getMerchantOrders: builder.query({
        query:() => ({
            url: ORDER_MERCHANTS_URL
        }),
        keepUnusedDataFor: 5, 
    }),
        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: "PUT",
            })
        })
    }),
 
});

export const  {
    useCreateOrderMutation, 
    useGetOrderDetailsQuery, 
    usePayOrderMutation, 
    useGetPayPalClientIdQuery,
    useGetMyOrdersQuery,
    useGetOrdersQuery,
    useDeliverOrderMutation,
    useGetMerchantOrdersQuery,
} = orderApiSlice;