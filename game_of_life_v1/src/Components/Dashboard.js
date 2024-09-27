import React, { Component } from 'react';

const Dashboard = props => {
    return (
        <div>
            <h1>Dashboard</h1>

            <form onSubmit = {props.generateGrid}>
                <input 
                    type = "number"
                    placeholder = "Number of Rows"
                    name = "numberOfRows"
                    value = {props.numberOfRows}
                    onChange = {props.inputChangeHandler}
                />
                <input 
                    type = "number"
                    placeholder = "Number of Columns"
                    name = "numberOfColumns"
                    value = {props.numberOfColumn}
                    onChange = {props.inputChangeHandler}
                />
                <button onClick = {(e) => props.generateGrid}>
                    Generate Grid
                </button>
            </form>


        </div>
    );
}

export default Dashboard;