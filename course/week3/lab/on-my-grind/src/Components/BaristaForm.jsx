import React, { Component, useState } from "react";

const BaristaForm = (props) => {

    const [inputs, setInputs] = useState({
        'temperature': '',
        'milk': '',
        'syrup': '',
        'blended': ''
    });

    const ingredients = {
        'temperature': ['hot', 'lukewarm', 'cold'],
        'syrup': ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
        'milk': ['cow', 'oat', 'goat', 'almond', 'none'],
        'blended': ['yes', 'turbo', 'no']
    }


    const onCheckAnswer = () => { return }
    const onNewDrink = () => { return }

    return (
        <div>
            <h2>Hi, I'd like to order a:</h2>
            <form>

            </form>
            <button type="submit" className="button submit" onClick={onCheckAnswer}>
                Check Answer
            </button>

            <button type="new-drink-button" className="button submit" onClick={onNewDrink}>
                New Drink
            </button>

        </div>
    )
}

export default BaristaForm