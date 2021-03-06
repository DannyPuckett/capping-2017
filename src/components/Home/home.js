// src/components/Home/home.js
import React, { Component } from 'react';
import classnames from 'classnames';
import logo from './logo.svg';
import './home.css';
import CompanyHeader from "../../shared/header/header";
import SearchContainer from "../../shared/search-container/search-container";
import PersonalProfileContainer from "../../shared/personal-profile-container/personal-profile-container";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            employees: []
        }
    }
//  This is wear we will make all of the AJAX Calla
    componentDidMount() {
        //  This fires before the page renders to gather all profiles,
        //  I may move this so that we have a loader while the employee
        //  list loads
        let that = this;
        fetch('http://localhost:3000/api/get-all-employees')
            .then(function(response) {
                response.json()
                    .then(function(data) {
                        let employees = that.state.employees;
                        employees = data.rows;
                        that.setState({
                            employees: employees
                        });
                    })
            })
            .catch(function(err) {
                console.log(err);
            })
    }
//Example of a post API call only keeping fo a referance to be used later
   /* addTest(event) {
        let that = this;
        event.preventDefault();
        let test_data = {
            test_name: this.refs.test_name.value,
            test_name2: this.refs.test_name2.value
        };
        var request = new Request('http://localhost:3000/api/add-employees', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(test_data)
        });
        //xmlhttprequest
        fetch(request)
            .then(function(response) {
                response.json()
                    .then(function(data) {
                        let employees = that.state.employees;
                        console.log(test_data, 'test_data');
                        employees = data.rows;
                        that.setState({
                            employees: employees
                        });
                        console.log(data, 'data');
                    })
            })
            .catch(function(err) {
                console.log(err);
            })
    }
*/
    render() {
        const { className, ...props } = this.props;
        return (
            <div className={classnames('Home', className)} {...props}>
                <CompanyHeader
                    logo={logo}
                />
                <PersonalProfileContainer/>
                <SearchContainer
                employees={ this.state.employees }
                />
            </div>
        );
    }
}

export default Home;