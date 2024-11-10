var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors"); 

var connectionString = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());

app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());


// <!-- CRUD Method -->

app.get("/products", (req ,res)=>{
    mongoClient.connect(connectionString)
    .then(clientObject=>{
        var database = clientObject.db("shopper");
            database.collection("products").find({}).toArray()
    .then(documents=>{
        res.send(documents);
        res.end();
    })
    })
})

// <!--Details -----Specific Product Details -->

app.get("/details/:id", (req , res)=>{
    var id = parseInt(req.params.id)
    mongoClient.connect(connectionString)
    .then(clientObject=>{
        var database = clientObject.db("shopper");
            database.collection("products").find({ProductId:id}).toArray()
            .then(document=>{
                res.send(document);
                res.end();
            })
    })
});

// <!--POST Method -->

app.post("/addproducts",(req , res)=>{
    mongoClient.connect(connectionString)
    .then(clientObject=>{
        var database = clientObject.db("shopper");
        var product =  {
            "ProductId":parseInt(req.body.ProductId),
            "Name":req.body.Name,
            "Price":parseFloat(req.body.Price),
            "Stock":(req.body.Stock=="true")?true:false
        };
        database.collection("products").insertOne(product)
                .then(result=>{
                    console.log("Record Inserted");
                    res.redirect("/products");
                    res.end();
                 })
    })
});

// <!--[PUT Method ] Upadte-- > 

app.put("updateproduct", (req , res)=>{
    mongoClient.connect(connectionString)
    .then(clientObject=>{
        var database = clientObject.db("shopper");
        var findQuery = {ProductId:parseInt(req.body.ProductId)};
        var updateQuery = {$set : {Name:req.body.Name, Price:parseFloat(req.body.Price) , Stock:(req.body.Stock=="true")?true:false}};
    
        database.collection("products").updateOne(findQuery , updateQuery)
        .then(result=>{
            console.log("Record Updated");
            res.redirect("/products");
            res.end();
        })
    
    })
});

// <!--DELETE Method -->

app.delete("/deleteproduct/:id", (req , res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(connectionString)
    .then(clientObject=>{
        var database = clientObject.db("shopper");
        database.collection("products").deleteOne({ProductId:id})
    .then(result=>{
        console.log("Record Deleted");
        res.redirect("/products");
        res.end();
    })
    })

})

app.listen(8080);
console.log(`Server Started : http://127.0.0.1:8080`)