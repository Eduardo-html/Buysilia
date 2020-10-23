const { validationResult } = require('express-validator')

const PurchaseModels = require('../../models/purchase/purchase')

const ProductModels = require('../../models/product/product')


class PurchaseController{

    static getAllPurchases(){
        return (req, resp) => {
            PurchaseModels.getAllPurchases()
                .then(rows => resp.send(rows))
                .catch(err => {
                    console.log(err)
                    resp.send({ error: err })
                })
            
        }

    }

    static getAllPurchasesByClient(){
        return (req, resp) => {
            PurchaseModels.getAllPurchasesByClient(req.params.clientId)
                .then(rows => resp.send(rows))
                .catch(err => {
                    console.log(err)
                    resp.send({ error: err })
                })
            
        }

    }

    static getAllPurchasesByProduct(){
        return (req, resp) => {
            PurchaseModels.getAllPurchasesByProduct(req.params.productId)
                .then(rows => resp.send(rows))
                .catch(err => {
                    console.log(err)
                    resp.send({ error: err })
                })
            
        }

    }

    static insertPurchase() {
        return (async (req, resp) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return resp.status(400).json({ errors: errors.array() })
            }

            const {stock} = await ProductModels.getProduct(req.body.product_id)
                                    .then((row) => row)
                                    .catch((err) => resp.send(err))
            
            if(stock==0) return resp.send('Sem stock')
            if(stock>0){

                return PurchaseModels.insertPurchase(req.body, stock)
                        .then(msg  => { 
                            console.log(msg) 
                            resp.redirect('/purchase')
                        })
                        .catch(err => {
                            console.log(err) 
                            resp.send({ error: err })
            })

            }

            
            
            
        })
    }

    static deletePurchase(){
        return ((req, resp) => {
            PurchaseModels.deletePurchase(req.params.id)
                .then( msg => {
                    console.log(msg)
                    resp.send({ message: msg })
                })
                .catch(err => {
                    console.log(err)
                    resp.send({ error: err })
                })
        })
    }
}

module.exports = PurchaseController