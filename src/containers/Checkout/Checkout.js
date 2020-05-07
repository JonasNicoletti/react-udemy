import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    cancelClickHandler = () => {
        this.props.history.goBack();
    }

    continueClickHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        cancelClicked={this.cancelClickHandler}
                        continueClicked={this.continueClickHandler}
                        ingredients={this.props.ings} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            );
        }
        return summary;
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};



export default connect(mapStateToProps)(Checkout);