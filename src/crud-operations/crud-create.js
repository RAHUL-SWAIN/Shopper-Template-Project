import { Formik , Form , Field , ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { response } from "express";
import { BrowserRouter , Router , Route , Link, Routes } from "react-router-dom";

export function CrudCreate(){
    
    const navigate = useNavigate();
    return(
        <div className="container-fluid">
            <h2>Add New Products</h2>
            <Formik 
            initialValues={{
                ProductId: 0 ,
                Name : '' ,
                Price : 0 ,
                Stock : false 
            }}
            onSubmit={
                (values)=>{
                    axios({
                        method:'post' ,
                        url :'http://127.0.0.1:8080/addproducts',
                        data :values
                    })
                    .then(()=>{
                        alert("Product Register");
                        navigate("/products");
                    })
                }
            }
            >
               {
                 <Form>
                    <dl>
                        <dt>Product Id</dt>
                            <dd><Field name="ProductId" type="number" /></dd>
                        <dt>Name</dt>
                            <dd><Field name="Name" type="text" /></dd>
                        <dt>Price</dt>
                            <dd><Field name="Price" type="number" /></dd>
                        <dt>Stock</dt>
                            <dd className="form-switch"><Field className="form-check-input" name="Stock" type="checkbox" />Available</dd>
                    </dl>
                    <button className="btn btn-primary">Add Product</button><br />
                    <Link className="ms-2" to="/products">View Product</Link>
                 </Form>
                 
               }

            </Formik>
        </div>
    );
}