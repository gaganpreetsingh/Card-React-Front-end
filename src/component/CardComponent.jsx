import React, { Component } from 'react';
import ListCardComponent from './ListCardComponent'
import CardService from '../service/CardService';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class CardComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            cardHolderName: '', limit: '', cardNumber: ''
        }
        this.validate = this.validate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    render() {
        let { cardHolderName, limit, cardNumber } = this.state
        return (
            
            <div className="jumbotron">
                
                <div className="container">
                    <div className="row">
                        <div className="column">
                            <h3>Credit Card System</h3>
                            
                            <Formik
                                initialValues={{ cardHolderName, limit, cardNumber }}
                                validate={this.validate}
                                onSubmit={this.onSubmit}
                                onReset ={this.onReset}
                                    
                                validateOnChange={false}
                                validateOnBlur={false}
                                enableReinitialize={true}
                            >
                                {
                                    (props) => (
                                        <Form>
                                            <div id="error" style={{display: 'none' }} className='alert alert-warning'></div>
                                            <div className="form-group">
                                                <fieldset className="form-group">
                                                    <label>Card Holder Name</label>
                                                    <Field className="form-control" type="text" name="cardHolderName" />
                                                    <ErrorMessage name="cardHolderName" component="div" className="alert alert-warning" />
                                                </fieldset>
                                            </div>
                                            <div className="form-group">
                                                <fieldset className="form-group">
                                                    <label>Card Number</label>
                                                    <Field className="form-control" type="text" name="cardNumber" />
                                                    <ErrorMessage name="cardNumber" component="div" className="alert alert-warning" />
                                                </fieldset>
                                            </div>
                                            <div className="form-group">
                                                <fieldset className="form-group">
                                                    <label>Limit</label>
                                                    <Field className="form-control" type="" name="limit" />
                                                    <ErrorMessage name="limit" component="div" className="alert alert-warning" />
                                                </fieldset>
                                            </div>
                                            <button className="btn btn-success" type="submit">Save</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <button className="btn btn-success" type="reset">Reset</button>
                                            <br /><br />
                                        </Form>
                                    )
                                }
                            </Formik>
                        </div>
                    </div>
                    <ListCardComponent />
                </div>
            </div>
        )
    }

    onReset(){
        document.getElementById("error").textContent=''
        document.getElementById("error").style.display='none';
    }
    onSubmit(values) {

        let card = {
            cardNumber: values.cardNumber,
            limit: values.limit,
            cardHolderName: values.cardHolderName
        }

        CardService.createCard(card)
            .then(
                response => {
                    if (response.status === 200) {
                        console.log(response.data.data)
                        let errors ={}
                        if (response.data.status === 'error') {
                           document.getElementById("error").style.display='block';
                           document.getElementById("error").textContent=response.data.data
                        } else if (response.data.status === 'success') {
                            alert('Data inserted')
                        }
                    }

                })
    }

    validate(values) {
        document.getElementById("error").style.display='none';
        let errors = {}
        if (!values.cardHolderName) {
            errors.cardHolderName = 'Enter Card Holder Name'
        }
        var RE = /^\d+$/
        if (!values.cardNumber) {
            errors.cardNumber = 'Enter Card Number'
        } else if (!RE.test(values.cardNumber)) {
            errors.cardNumber = 'Card Number is invalid'
        }
        if (!values.limit) {
            errors.limit = 'Enter Limit'
        } else if (isNaN(values.limit)) {
            errors.limit = 'Limit must be digit'
        }

        return errors
    }
}
export default CardComponent