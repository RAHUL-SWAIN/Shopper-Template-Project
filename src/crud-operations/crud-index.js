import axios from "axios";
import { useState,useEffect } from "react";
import { BrowserRouter , Router , Route , Link, Routes } from "react-router-dom";

export function CrudIndex(){

    const [products , setProducts ] = useState([]);
    useEffect(()=>{
        axios({
            method:'get',
            url :"http://127.0.0.1:8080/products"
        })
        .then(response=>{
            setProducts(response.data);
        })
    },[])
    return(
        <div className="container-fluid">
            <h2>Products Grid</h2>
            <div className="mb-3" >
                <Link to="/NewProduct" className="btn btn-primary" >Add New Product</Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product=>
                            <tr key={product.productId}>
                                <td>{product.Name}</td>
                                <td>
                                    <Link className="btn btn-info" to="/details" >
                                        <span className="bi bi-eye"></span>
                                    </Link>                                
                                </td>
                                <td>
                                    <Link className="btn btn-warning" to="/details" >
                                        <span className="bi bi-pen"></span>
                                    </Link>                                
                                </td>
                                <td>
                                    <Link className="btn btn-danger" to="/details" >
                                        <span className="bi bi-trash"></span>
                                    </Link>                                
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}