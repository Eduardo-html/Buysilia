const { validationResult } = require('express-validator')

const PurchaseModels = require('../../models/purchase/purchase')


class PurchaseController{

    static getAllPurchases(){
        return (req, resp) => {
            PurchaseModels.getAllPurchases()
                .then(rows => resp.send(rows))
                .catch(err => {
                    console.log(err)
                    resp.send(err)
                })
            
        }

    }

    static getAllPurchasesByClient(){
        return (req, resp) => {
            PurchaseModels.getAllPurchasesByClient(req.params.clientId)
                .then(rows => resp.send(rows))
                .catch(err => {
                    console.log(err)
                    resp.send(err)
                })
            
        }

    }

    static getAllPurchasesByProduct(){
        return (req, resp) => {
            PurchaseModels.getAllPurchasesByProduct(req.params.productId)
                .then(rows => resp.send(rows))
                .catch(err => {
                    console.log(err)
                    resp.send(err)
                })
            
        }

    }

    static deletePurchase(){
        return ((req, resp) => {
            PurchaseModels.deletePurchase(req.params.id)
                .then( msg => {
                    console.log(msg)
                    resp.send(msg)
                })
                .catch(err => {
                    console.log(err)
                    resp.send(err)
                })
        })
    }
}

module.exports = PurchaseController