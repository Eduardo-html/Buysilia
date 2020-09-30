const ClientModels = require('../../models/client/client')

class ClientController{

    static getAllClients(){
        return ((req, resp) => {
            ClientModels.getAllClients()
                .then(rows => resp.send(rows))
                .catch(err => {
                    console.log(err)
                    resp.send(err)
                }
                )
        })
    }

    static deleteClient(){
        return ((req, resp) => {
            ClientModels.deleteClient(req.params.id)
                .then( msg => {
                    console.log(msg)
                    resp.send(`${msg}`)
                })
                .catch(err => {
                    console.log(err)
                    resp.send(err)
                })
        })
    }

}

module.exports = ClientController