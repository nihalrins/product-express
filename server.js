import express from 'express';
const app=express();

//Middleware
app.use(express.json());


let products=[
    {
        id:1,
        name:"samsung",
        price:73000,
        model:"S23",
        number :"s23fe"
    },
    {
        id:2,
        name:"iphone",
        price:87000,
        model:"iphone 15 pro",
        number :"15 pro varrient "
    },
    {
        id:3,
        name:"realme",
        price:67000,
        model:"realme 16 pro",
        number:"16 pro varrient "
    },
];

//get all students
app.get('/getProducts',(req,res)=>{
    res.status(200).json({
        message:"Product details fetched successfully",
        products:products
    })
});

//get student details by id
app.get('/getProduct/:id',(req,res)=>{
    const id=Number(req.params.id);
    const product=products.find((product)=>product.id===id);
    if(!product){
        res.status(404).json({
            message:"Product Not Found",
        })
    }
        res.status(200).json({
            message:"Product details fetched successfully",
            product:product
        })
});

//add a student
app.post('/addProduct',(req,res)=>{
    const {name,price,model,number}=req.body;
    if(!name || !price || !model || !number){
        res.status(404).json({
            message:"All fields are required",
        });
    }
    const newProduct={
        id:products.length> 0 ? Math.max(...products.map(s=>s.id))+1 : 1,
        name:name,
        price:price,
        model:model,
        number:number
    };
    products.push(newProduct);
    res.status(201).json({
        message:"product added successfully",
        product:newProduct
    })
})

app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000");
    
})