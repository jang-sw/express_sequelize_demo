const express = require('express');
const app = express();
const cors = require("cors");
const { Users, Contents, User_infos } = require('../models')

var corOptions = {
    origin: "http://localhost:3000",
};
app.use(cors(corOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("port", process.env.PORT || 3000);

app.get( '/userInfoList', (request, response) => {
    Users.findAll({
        include: [User_infos] 
    }).then((result) => {
        response.status(200).send( result );
    }).catch((err) => {
        console.log(err);
        response.status(500).send( 'fail' );
    });        
});

app.post( '/check/user', (request, response) => {
    Users.findOne({
        where: {id: request.body.id}
    }).then((result) => {
        response.status(200).send( result ? 'yes' : 'no' );
    }).catch((err) => {
        console.log(err);
        response.status(500).send( 'fail' );
    });   
});

app.post( '/user', (request, response) => {
    Users.create({
        id: request.body.id,
        pwd: request.body.pwd 
    }).then(() => {
        response.status(200).send( 'success' );
    }).catch((err) => {
        console.log(err);
        response.status(500).send( 'fail' );
    });
});

app.post( '/userInfo', (request, response) => {
    User_infos.create({
        user_id: request.body.user_id,
        address: request.body.address, 
        name: request.body.name 
    }).then(() => {
        response.status(200).send( 'success' );
    }).catch((err) => {
        console.log(err);
        response.status(500).send( 'fail' );
    });
});

app.put( '/userInfo', (request, response) => {
    User_infos.update(
        {
            address: request.body.address, 
            name: request.body.name 
        },
        {
            where: {user_id: request.body.user_id}
        }
    ).then((result) => {
        response.status(200).send( result[0] !== 0 ? 'success' : 'no info' );
    }).catch((err) => {
        console.log(err);
        response.status(500).send( 'fail' );
    });
});

app.delete( '/content', (request, response) => {
    Contents.destroy(
        {where: {seq: request.body.seq}
    }).then((result) => {
        response.status(200).send( result ? 'success' : 'no content');
    }).catch((err) => {
        console.log(err);
        response.status(500).send( 'fail' );
    });
});

app.get( '/contentList/WithUser', (request, response) => {
    Users.findAll({
        include: [Contents] 
    }).then((result) => {
        response.status(200).send( result );
    }).catch((err) => {
        console.log(err);
        response.status(500).send( null );
    });  
});

app.delete( '/user', (request, response) => {
    Users.destroy({
        where: {id: request.body.id},
    }).then((result) => {
        response.status(200).send( result ? 'success' : 'no user' );
    }).catch((err) => {
        console.log(err);
        response.status(500).send( 'fail' );
    })
});
 
app.listen(app.get("port"), () => {
    console.log(`${app.get("port")} port start`);
});




