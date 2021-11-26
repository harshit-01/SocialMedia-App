import React from 'react';
import "./login.css";
import {Row,Col,Container,Button} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import {useHistory} from "react-router-dom"

const MyTextInput = ({ label, ...props }) => {

    const [field, meta] = useField(props);
    return (
      <Row>
        <Col xs={4}>
        <label htmlFor={props.id || props.name} className="fw-bold">{label}:</label>
        </Col>
        <Col xs={8}>
        <input className="text-input mb-2 ms-2 rounded inp w-75" {...field} {...props}/>
        </Col>
        <br />
        {meta.touched && meta.error ? (
          <div className="error text-danger">*{meta.error}</div>
        ) : null}
      </Row>
    );
  };
  
  const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
      <div>
        <label className="checkbox-input">
          <input type="checkbox" {...field} {...props} className="rounded inp"/>
          {children}
        </label>
        <br/>
        {meta.touched && meta.error ? (
          <div className="error text-danger">*{meta.error}</div>
        ) : null}
      </div>
    );
  };
  
  const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error text-danger">*{meta.error}</div>
        ) : null}
      </div>
    );
  };
  

export default function Login(){
    const history = useHistory()
    return(
        <div className="login"> 
            <Row className="loginWrapper">
                <Col className="loginLeft d-none d-md-block">
                    <h3 className="loginLogo">TieUp</h3>
                    <span className="loginDesc ms-2 mb-2">
                        Interact with people around the world on TieUp.
                    </span>
                </Col>
                <h1 className="d-flex justify-content-center text-primary fw-bolder
                d-md-none">TieUp</h1>
                <Col className="loginRight">
                    <div className="loginBox mt-2">
                        <h3 className="text-center text-primary ">Login</h3>
                        <Formik
                            initialValues={{
                            userName: '',
                            email: '',
                            acceptedTerms: false, // added for our checkbox
                            jobType: '', // added for our select
                            password:'',
                            confirmPassword:'',
                            }}
                            validationSchema={Yup.object({
                            userName: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                            email: Yup.string()
                                .email('Invalid email address')
                                .required('Required'),
                            acceptedTerms: Yup.boolean()
                                .required('Required')
                                .oneOf([true], 'You must accept the terms and conditions.'),
                            password: Yup.string()
                                    .required('No password provided.') 
                                    .min(8, 'Password is too short - should be 8 chars minimum.')
                                    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
                            confirmPassword: Yup.string()
                                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
                            jobType: Yup.string()
                                .oneOf(
                                ['designer', 'development', 'product', 'other'],
                                'Invalid Job Type'
                                )
                                .required('Required'),
                            
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 400);
                            history.push('/home')
                            }}
                        >
                            <Form>
                            <MyTextInput
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="jane@formik.com"
                            />
                            
                            <MyTextInput
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                            />
                            <Button variant="primary" type="submit" className="my-2" >
                                Login
                            </Button>
                            <br/>
                            <div className="my-1">Don't have an account?</div>
                            <Button variant="success" type="submit" className="mt-2 mb-2" 
                            onClick={()=>{
                              history.push('/signup')
                            }}>Create a new account</Button>
                            </Form>
                        </Formik>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

