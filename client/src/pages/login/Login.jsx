import React,{useContext} from 'react';
import "./login.css";
import {Row,Col,Button} from 'react-bootstrap';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import {useHistory} from "react-router-dom"
import {loginCall} from "./../../apiCall"
import {AuthContext} from "./../../context/AuthContext"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const MyTextInput = ({ label, ...props }) => {
    
    const [field, meta] = useField(props);
    return (
      <Row>
        <Col xs={4}>
        <label htmlFor={props.id || props.name} className="fw-bold">{label}:</label>
        </Col>
        <Col xs={8}>
        <input className="text-input mb-3 ms-2 rounded inp w-75" {...field} {...props}/>
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
  

export default function Login({setIsLoggedIn}){
    const history = useHistory();
    const {user,isFetching,error,dispatch} = useContext(AuthContext);
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
                        <h3 className="text-center text-primary mb-4">Login</h3>
                        <Formik
                            initialValues={{
                            username:'',
                            email: '',
                            password:'',
                            }}
                            validationSchema={Yup.object({
                            username:Yup.string().required('Required'),
                            email: Yup.string()
                                .email('Invalid email address')
                                .required('Required'),
                            password: Yup.string()
                                .required('No password provided.') 
                                .min(8, 'Password is too short - should be 8 chars minimum.')
                                .matches(/[a-zA-Z]/, 'Password can only contain alphanumeric characters.')
                            })}
                            onSubmit={async(values, { setSubmitting,resetForm }) => {
                            await loginCall(values,dispatch);
                            setTimeout(()=>{
                            let name =sessionStorage.getItem('name')?sessionStorage.getItem('user'):null;
                            console.log(name)
                            if(name){
                              if(values){
                                  // sessionStorage.setItem('user', values.username);
                                  setIsLoggedIn(true)
                              }
                              toast.success('LoggedIn successfully', {
                                position: "top-right",
                                autoClose: 1500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme:"colored"
                            });
                              history.push('/')
                            }
                            else{
                              toast.error('Incorrect password/ username/ email', {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme:"colored"
                            });
                            resetForm();
                            }},1500)
                            }}
                        >
                            <Form>
                            <MyTextInput
                                label="Username"
                                name="username"
                                type="username"
                                placeholder="Harshit Kashyap"
                            />
                            <MyTextInput
                                label="Email"
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
                            
                            {isFetching? <button class="btn btn-primary" type="submit" disabled>
                              <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Loading...
                            </button>:
                            <Button variant="primary" type="submit" className="my-2" >
                              Login
                            </Button>}
                            <br/>
                            <div className="my-1">Don't have an account?</div>
                            <Button variant="success" type="button" className="mt-2 mb-2" 
                            onClick={()=>{
                              history.push('/signup')
                            }}>Create a new account</Button>
                            </Form>
                        </Formik>
                    </div>
                </Col>
            </Row>
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
        </div>
    )
}

