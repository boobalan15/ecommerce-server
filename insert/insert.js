// //import modules
// const express = require('express')
// let mongodb = require('mongodb')
// //import url
// let url = require('../url')
// //create mongoclient
// let mcl = mongodb.MongoClient
// //create router instance
// let router = express.Router()
// //create rest api
// router.get("/", (req, res) => {
// 	//connect to mongodb
// 	mcl.connect(url, (err, conn) => {
//     	if (err)
//         	console.log('Error in connection:- ', err)
//     	else {
//         	let db = conn.db('miniprj')
//         	db.collection('products').find().toArray((err, array) => {
//             	if (err)
//                 	console.log('Error :- ' + err)
//             	else {
//                 	console.log('Data sent')
//                 	res.json(array)
//                 	conn.close()
//     	        }
//         	})
//     	}
// 	})
// })
 
// //User login Authentication
// router.post("/auth", (req, res) => {
// 	let uname = req.body.uname
// 	let upwd = req.body.upwd
// 	let obj = { uname, upwd }
// 	//connect to mongodb
// 	mcl.connect(url, (err, conn) => {
//     	if (err)
//         	console.log('Error in connection:- ', err)
//     	else {
//         	let db = conn.db("miniprj")
//         	db.collection('users').find(obj).toArray((err, array) => {
//             	if (err)
//                 	console.log(err)
//             	else {
//                 	if (array.length > 0)
//                     	res.json({ 'auth': 'success', 'user': uname })
//                 	else
//                     	res.json({ 'auth': 'failed' })
//                 	console.log('Auth response sent')
//                 	conn.close()
//             	}
//         	})
//     	}
// 	})
// })
// //Fetch cart data
// router.post("/fetchCart", (req, res) => {
// 	let uname = req.body.uname
// 	let obj = { uname }
// 	//connect to mongodb
// 	mcl.connect(url, (err, conn) => {
//     	if (err)
//         	console.log('Error in connection:- ', err)
//     	else {
//         	let db = conn.db("miniprj")
//         	db.collection('cart').find(obj).toArray((err, array) => {
//             	if (err)
//                 	console.log(err)
//             	else {
//                 	res.json(array)
//                 	console.log(`Cart response for ${obj.uname} sent`)
//                 	conn.close()
//             	}
//         	})
//     	}
// 	})
// })
 
 
// //export router
// module.exports = router

















//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
let url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//create rest api
router.post("/", (req, res) => {
	let obj = req.body
	//connect to mongodb
	mcl.connect(url, (err, conn) => {
    	if (err)
        	console.log('Error in connection :- ', err)
    	else {
        	let db = conn.db("miniprj")
        	db.collection('products').insertOne(obj, (err) => {
            	if (err)
                	res.json({ 'insert': 'Error ' + err })
            	else {
                	console.log("Data inserted")
                	res.json({ 'insert': 'success' })
              	  conn.close()
            	}
        	})
    	}
	})
})
 
//Insert User
router.post("/createUser", (req, res) => {
	let obj = {
    	"userid": req.body.userid,
    	"uname": req.body.uname,
    	"upwd": req.body.upwd,
    	"email": req.body.email,
    	"address": req.body.address,
    	"contact": req.body.contact
	}
	//connect to mongodb
	mcl.connect(url, (err, conn) => {
    	if (err)
        	console.log('Error in connection :- ', err)
    	else {
        	let db = conn.db("miniprj")
        	db.collection('users').insertOne(obj, (err) => {
            	if (err)
                	res.json({ 'userInsert': 'Error ' + err })
            	else {
                	console.log("User inserted")
                	res.json({ 'userInsert': 'success' })
                	conn.close()
            	}
        	})
    	}
	})
})
 
//insert product into cart
router.post("/cartInsert",(req,res)=>{
	let obj = {
    	"p_id" : req.body.p_id,
    	"p_cost" : req.body.p_cost,
    	qty : 1,
    	"p_img":req.body.p_img,
    	"uname" : req.body.uname
	}
	//connect to mongodb
	mcl.connect(url, (err, conn) => {
    	if (err)
        	console.log('Error in connection :- ', err)
    	else {
        	let db = conn.db("miniprj")
        	db.collection('cart').insertOne(obj, (err) => {
            	if (err)
                	res.json({ 'cartInsert': 'Error ' + err })
            	else {
                	console.log("Prouct in Cart inserted")
                	res.json({ 'cartInsert': 'success' })
                	conn.close()
            	}
        	})
    	}
	})
})
 
//export router
module.exports = router
