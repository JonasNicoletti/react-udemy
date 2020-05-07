import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

class Orders extends Component {

    componentDidMount() {
        this.props.onOrdersInit();
    }

    render() {
        let orders = <Spinner />;
        if(!this.props.loading) {
            orders = this.props.orders.map(
                order => <Order key={order.id} order={order}/>
                );
        }
        return (
            <div>
                <h2>Your Orders</h2>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrdersInit: () => dispatch(actions.fetchOrders())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));