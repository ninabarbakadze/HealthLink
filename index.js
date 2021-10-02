require('dotenv').config();
const express = require('express');
const app = express(); // express object created
const server = require('http').createServer(app); // http server object created (remark: only created, but hasn't started yet.. this will be only done with the server.listen())
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000", //we might need to change, when front end is deployed in netlify
        methods: ["GET", "POST"]
    }
}); // we give our server object to the socket.io library knows our server when where we are listening
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const db = require('./models/model')
const router = require('./router');

const corsConfig = {
    // REMOVE-START
    origin: 'http://localhost:3000',
    credentials: true,
    // REMOVE-END
};

const { devPORT, SESS_SECRET } = process.env || 8080;
console.log(SESS_SECRET);

app.use(cors(corsConfig));
app.use(express.json())
    .use(cookieParser())
    .use(session({
        //this middleware will create a session object and attach it to the request
        //name that will appear in the browser dev-tool (session name)
        name: 'sid',
        saveUninitialized: false,
        resave: false,
        secret: SESS_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60, //1 hour session
            sameSite: true,
            httpOnly: false,
            secure: false
        },
    }))
    .use(router);


(async function bootstrap() {
    //   await db.sequelize.sync({force:true}); //drop all tables and create again
    await db.sequelize.sync();
    //as soon we receive an incoming http request from a client, we want immediatly to handover him a socket and start listening (maybe it has safety loop)
    io.on('connection', (socket) => {
        socket.emit('ownuser', socket.id); //as soon client makes a request to connect with the server, a socket is created, and here we handover this client socket.id with the emit() function

        console.log('connection established');

        socket.on('disconnect', () => {
            console.log('disconnected');
            socket.broadcast.emit("callended"); //all users will be notified that the call has been terminated
        });

        //call attempt package received in server from the caller user, will be sent from the server to the callee user
        socket.on('call', ({ destinationUser, signallingData, from, name }) => {
            console.log('going to call');
            io.to(destinationUser).emit("call", { signal: signallingData, senderUser: from, senderName: name });
        });

        //answer received in server from the callee user, will be sent from the server to the caller user
        socket.on('answer', (data) => {
            console.log('going to answer');
            console.log('callerId: ', data.callerId);
            console.log('signaldata: ', data.signaldata);
            io.to(data.callerId).emit("callaccepted", data.signaldata);
        });
    });
    server.listen(devPORT, () => {
        console.log('Server and DB Operating in port ', devPORT);
    })
})();

