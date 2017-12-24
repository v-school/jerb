import React, { Component } from 'react';

// packages
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../Redux/auth";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                username: "",
                password: "",
                lName: "",
                fName: ""
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        e.persist();
        this.setState((prevState) => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [e.target.name]: e.target.value
                }
            }
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.signup(this.state.inputs, this.props.history);
        this.clearInputs();
    }
    clearInputs() {
        this.setState({
            inputs: {
                username: "",
                password: "",
                lName: "",
                fName: ""
            }
        });
    }
    render() {
        let inputs = this.state.inputs;
        return (
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} value={inputs.fName} name="fName" type="text" placeholder="First Name" />
                <input onChange={this.handleChange} value={inputs.lName} name="lName" type="text" placeholder="Last Name" />
                <input onChange={this.handleChange} value={inputs.username} name="username" type="text" placeholder="@" />
                <input onChange={this.handleChange} value={inputs.password} name="password" type="password" placeholder="#" />
                <button type="submit">Submit</button>
                <p>{this.props.errMsg}</p>
                <span>Already a user?</span>
                <Link to="/login">Login</Link>
            </form>
        )
    }
}

const mapStateToProps = state => ({ errMsg: state.auth.errMsg.signup })

export default connect(mapStateToProps, { signup })(Signup);