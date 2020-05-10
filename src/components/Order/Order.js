import React from 'react';

import classes from './Order.css';

const Order = (props) => {
    const ingredients = []
    for (let ingredientName in props.order.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.order.ingredients[ingredientName]
            });
    }

    const ingredientsOutput = ingredients.map(
        ig => {
            return <span
                style={
                    {
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }}
                key={ig.name}>
                {ig.name} ({ig.amount})
                </span>
        }
    )
    return (
        <div className={classes.Order}>
            <p>
                Ingredients: {ingredientsOutput}
            </p>
            <p>
                Price: <strong>{Number.parseFloat(props.order.price).toFixed(2)}</strong> USD
            </p>
        </div>
    );
}

export default Order;