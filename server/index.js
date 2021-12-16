const express = require("express");
const mysql = require('mysql');
const ticketsRouter = require('./router/tickets');
const usersRouter = require('./router/users');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { response } = require("express");
require('dotenv').config();

const saltrounds = 10;
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "superSecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    }
}))

var connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DATABASE
})

connection.connect(err => {
    if(err){
        console.log('cannot establish connection')
    }else{
        console.log('database connection established')
    }
})

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltrounds, (err, hash) => {
        if(err) console.log(err);

        connection.query(
            "INSERT INTO Users (username, password, permissions) VALUES (?,?,?)",
            [username, hash, "Team Member"],
            (err, res) => console.log(err)
        ) 
    })
})

app.get('/login',(req, res) => {
    if(req.session.user){
        res.send({ loggedIn: true, user : [ req.session.user[0].Username, req.session.user[0].permissions]})
        console.log('loggedin true')
        res.end();
    }else{
        res.send({ loggedIn: false,})
        res.end();
    }
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    connection.query(
        "SELECT * FROM Users WHERE Username = ?;",
        username,
        (err, result) => {
            if(err) res.send({err: err})
            else if(result !== null && result !== undefined && result.length > 0){
                bcrypt.compare(password, result[0].Password, (err, response) => {
                    if(response){
                        req.session.user = result;
                        res.send([result[0].Username, result[0].permissions])
                        res.end();
                    }else{
                        res.send({ message: 'try again' })
                        res.end();
                    }

                })
            }else{
                res.send({ message: "user does not exist" })
                res.end();
            }
        }
    )
})

app.get('/projectusers', (req, res) => {
    let newArr = [];
    connection.query(
        "SELECT * FROM Users;",
        (err, result) => {
            if(err) res.send(err);
            if(result === undefined){
                console.log("project users undefined")
                return;
            }else{
                result.map(obj => newArr.push({user: obj.Username, role: obj.permissions}))
                res.send(newArr)
                res.end();
            }
            
        }
    )
})

app.get('/projects', (req, res) => {
    
    connection.query(
        "SELECT * FROM projects",
        (err, result) => {
            if(err) res.send(err);
            res.send(result)
            res.end();
        }
    )
})

app.post('/createproject', (req, res) => {
    let users = req.body.users;

    users.map((obj) => {
        connection.query(
            "INSERT INTO projects (name, role, project, projectlead) VALUES (?,?,?,?)",
            [obj.user, obj.role, obj.project, obj.projectlead],
            (err, response) => {
                if(err) {
                    res.send(err) 
                    return;
                }
                
            }
        )
    })
    res.send('project created')
    res.end();
    
})

app.post('/editproject', (req, res) => {
    let users = req.body.users;
    let projectName = req.body.projectName;
    connection.query (
        "DELETE FROM projects WHERE project = ?",
        projectName,
        (err, response) => {
            if(err) console.log(err);
        }
    )

    users.map(obj => {
        connection.query (
            "INSERT INTO projects (name, role, project, projectlead) VALUES (?,?,?,?)",
            [obj.user, obj.role, obj.project, obj.projectlead],
            (err, response) => {
                if(err) console.log(err);
            }
        )
    })
})

app.post('/deleteproject', (req, res) => {
    let projectName = req.body.projectName;
    
    connection.query (
        "DELETE FROM projects WHERE project = ?",
        projectName,
        (err, response) => {
            if(err) res.send(err);
            else res.send('Proejct Deleted');
        }
    )
    
})

app.get('/projectname', (req, res) => {

    connection.query(
        "SELECT project FROM projects",
        (err, result) => {
            if(err) res.send(err)
            else{
                let newArr = []
                
                result.map(obj =>{
                    return obj.project
                }).filter(obj => {
                    if(newArr.includes(obj)){
                        return false
                    }else{
                        newArr.push(obj)
                        return true
                    }         
                })
                res.send(newArr)
                res.end();
            }
            
        }
        
    )
 
})

app.post('/createticket', (req, res) => {

    connection.query(
        'INSERT INTO tickets (title, project, assignedDev, ticketStatus, createdTime, description, submitter, priority) VALUES (?,?,?,?,?,?,?,?)',
        [req.body.ticketTitle, req.body.projectName, req.body.assignedDeveloper, req.body.ticketStatus, req.body.currrentTime,
        req.body.ticketDescription, req.body.submitter, req.body.ticketPriority],
        (err) => {
            if(err) console.log(err)
            else res.send('ticket created')
        } 
    )
    
})

app.post('/get-projects', (req, res) => {
    let name = req.body.loginStatus;
    let projectList = [];

    connection.query(
        'SELECT project FROM projects WHERE name = ?',
        name,
        (err, result)=> {
            if(err) console.log(err);
            else{
                res.send(result)
                res.end();
            }
        }  
    )
})

app.post('/get-tickets', (req, res) => {

        connection.query(
            'SELECT * FROM tickets WHERE project = ?',
            req.body.project,
             (err, result) => {
                if(err) res.send(err);
                else {
                    res.send(result)
                    res.end();
                }          
            }
        )
    })

app.post('/edit-ticket', (req, res) => {

    connection.query(
        "UPDATE tickets SET title = ?, assignedDev = ?, ticketStatus = ?, description = ?, priority = ? WHERE ticket_ID = ?",
        [req.body.ticketTitle, req.body.assignedDeveloper, req.body.ticketStatus, req.body.ticketDescription, 
        req.body.ticketPriority, req.body.ticketID],
        (err) => {
            if(err) console.log(err)
            else console.log('ticket updated')
        }
    )
})

app.post('/delete-ticket', (req, res) => {
    connection.query(
        'DELETE FROM tickets WHERE ticket_ID = ?',
        req.body.ticket_ID,
        (err) => {
            console.log(err);
        }
    )
})

app.post('/dashboard-ticket', (req, res) => {

    if(req.body.name){    
        connection.query(
            'SELECT * FROM projects JOIN tickets ON projects.name = ? and projects.project = tickets.project',
            req.body.name,
            (err, result) =>{
                if(err) console.log(err)
                else{
                    res.send(result)
                    res.end();
                }
            }
        )
    }
})

app.use(ticketsRouter)

app.listen(port, () => console.log(`server has started on port ${port}`))