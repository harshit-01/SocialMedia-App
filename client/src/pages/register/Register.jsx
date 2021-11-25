import React from 'react';
import "./register.css";
import {Row,Col,Container,Button} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }) => {

    const [field, meta] = useField(props);
    return (
      <Row>
        <Col xs={3}>
        <label htmlFor={props.id || props.name}>{label}:</label>
        </Col>
        <Col xs={9}>
        <input className="text-input mb-2 ms-2" {...field} {...props} />
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
          <input type="checkbox" {...field} {...props} />
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
  

export default function Register(){
    return(
        <Container className="login"> 
            <Row className="loginWrapper">
                <Col className="loginLeft">
                    <h3 className="loginLogo">TieUp</h3>
                    <span className="loginDesc">
                        Interact with people around the world on TieUp.
                    </span>
                </Col>
                <Col className="loginRight">
                    <div className="loginBox mt-2">
                        <h3 className="text-center text-primary">Signup</h3>
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
                            }}
                        >
                            <Form>
                            <MyTextInput
                                label="Username"
                                name="userName"
                                type="text"
                                placeholder="Jane"
                            />

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
                            <MyTextInput
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                            />

                            <MyCheckbox name="acceptedTerms">
                                {" "}I accept the terms and conditions
                            </MyCheckbox>
                            <Button variant="primary" type="submit" className="my-2">
                                Signup
                            </Button>
                            <br/>
                            <div className="my-1">Already have an account?</div>
                            <Button variant="success" type="submit" className="mt-2 mb-2" >Log in to your account</Button>
                            </Form>
                        </Formik>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

