import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (err) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: err
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('orders.json?auth=' + token, orderData)
        .then( response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        }) 
        .catch( error => dispatch( purchaseBurgerFail(error)));
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (err) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: err
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        const queryParam = "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get('/orders.json' + queryParam)
            .then(resp => {
                const fectchedOrder = [];
                for (let key in resp.data) {
                    fectchedOrder.push({
                        ...resp.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fectchedOrder));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    };
};