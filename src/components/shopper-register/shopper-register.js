import { Formik ,useFormik , Form , Field , ErrorMessage  } from "formik";
import axios from "axios";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";


export function ShopperRegister(){

    const navigate = useNavigate();
    return(
        <div className="container-fluid">
         <h2>Register Users</h2>   
            <Formik
            initialValues={{
                UserId:"",
                UserName:"" , 
                Password : "" ,
                Email : "" ,
                Age : 0 ,
                Mobile : ""
            }}

            validationSchema={
                yup.object({
                    UserId:yup.string().required("User Id Required")
                                       .min(4, "Id Too Short")
                                       .max(6, "Type max 6 charecter's"),
                    UserName:yup.string().required("User name Required"),
                    Password:yup.string().required("password must required").matches(/(?=.*[A-Z])\w{4,15}/, "Password 4 to 15 With Atleast One Uppercase Charecters"),
                    Email:yup.string().required("Email Required").email("Invalid Email"),
                    Age:yup.number().required("Age Required"),
                    Mobile:yup.string().required("Mobile Required")
                              .matches(/\+91\d{10}/, "Invalid Mobile +91 and 10 degits ")         
                })
            }

            onSubmit={
                (values)=>{
                    axios({
                        method:"post" , 
                        url:"http://127.0.0.1:5000/registruser",
                        data:values
                    })
                    .then(()=>{
                        alert("Register Successful..");
                        navigate("/login");
                    })
                }
            }
            
            >
            <Form>
                    <dl>
                        <dt>User Id</dt>
                             <dd> <Field type="text" name="UserId" /></dd>
                             <dd className="text-danger"><ErrorMessage name="UserId" /></dd>
                        <dt>User Name</dt>
                            <dd><Field type="text" name="UserName"  /></dd>
                            <dd className="text-danger"><ErrorMessage name="UserName" /></dd>
                        <dt>Password</dt>
                            <dd><Field type="Password" name="Password" /></dd>
                            <dd className="text-danger"><ErrorMessage name="Password" /></dd>
                        <dt>Email</dt>
                            <dd><Field type="text" name="Email"  /></dd>
                            <dd className="text-danger"><ErrorMessage name="Email" /></dd>
                        <dt>Age</dt>
                            <dd><Field type="number" name="Age" /></dd>
                            <dd className="text-danger"><ErrorMessage name="Age" /></dd>
                        <dt>Mobile</dt>
                            <dd><Field type="text" name="Mobile" /></dd>
                            <dd className="text-danger"><ErrorMessage name="Mobile" /></dd>
                    </dl>
                    <button className="btn btn-primary" type="submit">Register</button>
                <div>
                    <Link to="/login">Existing User ?</Link>
                </div>
            </Form>  
            </Formik>
        </div>
    );
}