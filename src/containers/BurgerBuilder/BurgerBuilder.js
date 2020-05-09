import React, { Component } from "react";
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';


class BurgerBuilder extends Component {

    state = {
        showCheckoutModal: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();    
    }

    isPurchasable(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((tot, el) => {
                return tot + el;
            }, 0);
        return  sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) { 
            this.setState({ showCheckoutModal: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseCancelHandler = () => this.setState({ showCheckoutModal: false });

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push( '/checkout');
    }
    render() {
        let orderSummary = null;

        let burger = this.props.error ? <p> Ingredients can t be loaded </p> : <Spinner />
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        price={this.props.price}
                        purchasable={this.isPurchasable(this.props.ings)}
                        isAuth={this.props.isAuthenticated}
                        showPurchaseModal={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
            />;
        }

        return (
            <Aux>
                <Modal show={this.state.showCheckoutModal} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToPros = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToPros = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToPros, mapDispatchToPros)(withErrorHandler(BurgerBuilder, axios)); 