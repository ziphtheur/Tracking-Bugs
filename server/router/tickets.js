const express = require('express');
const { createConnection } = require('mysql');
const router = express.Router();

const app = express();

app.post('/createticket', (req, res) => {

})

app.get('/projectname', (req, res) => {

    connection.query(
        "SELECT project FROM projects",
        (err, result) => {
            if(err) res.send(err)
            else{
                let newArr = []
                
                res.map(obj =>{
                    return obj.project
                }).filter(obj => {
                    if(newArr.includes(obj)){
                        return false
                    }else{
                        newArr.append(obj)
                        return true
                    }         
                })
                res.send(newArr)
            }
            
        }
        
    )
 
})

module.exports = router;