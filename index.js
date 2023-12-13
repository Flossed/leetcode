/* File             : index.js
   Author           : Daniel S. A. Khan
   Copywrite        : Daniel S. A. Khan (c) 2023
   Description      : Main file for Leetcode
   Notes            :
*/

/* ------------------     External Application Libraries      ----------------*/
const mongoose                         = require( 'mongoose' );
const express                          = require( 'express' );

const bodyParser                       = require( 'body-parser' );
const fileUpload                       = require( 'express-fileupload' );
const favicon                          = require( 'serve-favicon' );
const path                             = require( 'path' );
const cors                             = require( 'cors' );
/* ------------------ End External Application Libraries      ----------------*/

/* ------------------     Internal Application Libraries      ----------------*/
const { logger }                        = require( './services/generic');
const config                            = require( './services/configuration' );
/* ------------------ End Internal Application Libraries      ----------------*/


/* --------------- External Application Libraries Initialization -------------*/
const db                                = mongoose.connection;
const app                               = express();

// eslint-disable-next-line no-undef
const directoryName                     = __dirname;
app.set( 'view engine','ejs' );
mongoose.connect( config.get( 'application:DB' ), {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true} );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( express.static( 'public' ) );
app.use( fileUpload() );
app.use( favicon( path.join( directoryName, 'public\\img', 'zandd.ico' ) ) );
app.use( cors() );

app.use( function ( req, res, next )
{   res.header( 'Access-Control-Allow-Origin', '*' );
    res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
    next();
});

/* ----------- End External Application Libraries Initialization -------------*/

/* ------------------------------------- Cntrls -------------------------*/
const genCntrl                          = require( './controllers/generic' );
/* -------------------------------- End Cntrls --------------------------*/

/* ------------------------------------- Services    -------------------------*/
/* -------------------------------- End Services    --------------------------*/

/* --------------- Internal Variables Initialization -------------------------*/
/* ----------- End Internal Variables Initialization -------------------------*/

/* ------------------------------------- Application constants ----------------*/
const ApplicationPort                   = config.get( 'application:ServiceEndPointPort' );
const applicationName                   = config.get( 'application:applicationName' );
/* --------------------------------- End Application constants ----------------*/

/* --------------- Internal Application Libraries Initialization -------------*/
/* ----------- End Internal Application Libraries Initialization -------------*/

/* ------------------------------------- Functions   -------------------------*/
function setRouting ()
{   try
    {   logger.trace( applicationName + ':index:setRouting:Started ' );
        app.get( '/',genCntrl.main );
        app.get( '/about',genCntrl.main );
        app.get( '/addNavPoint',genCntrl.main );
        app.get( '/searchAddress',genCntrl.main );
        app.post( '/manageAddress',genCntrl.main );
        app.get( '/listAddress',genCntrl.main );
        app.get( '/address/:id',genCntrl.main );
        app.use( '*', genCntrl.main );
        logger.trace( applicationName + ':index:setRouting:Done ' );
    }
    catch ( ex )
    {   logger.exception( applicationName + ':index:setRouting:An exception Occured:[' + ex + ']' );
    }
}


async function initializeServices ()
{   try
    {   logger.trace( applicationName + ':index:initializeServices: Starting' );

        const timeStamp                = new Date();

        logger.info( '********************************************************************************' );
        logger.info( '*                    Starting ' + applicationName + '                                         *' );
        logger.info( '*                    Time: ' + timeStamp.toLocaleTimeString( 'de-DE' ) + '                                            *' );
        logger.info( '*                    Date: ' + timeStamp.toLocaleDateString( 'de-DE' ) + '                                           *' );
        logger.info( '*                    App listening on port [' + ApplicationPort + ']                             *' );
        logger.info( '********************************************************************************' );

        db.on( 'error', console.error.bind( console, 'connection error: ' ) );
        db.once( 'open',function () { console.log( 'Connected to DB' ); } );


        logger.trace( applicationName + ':index:initializeServices: Done' );
    }
    catch ( ex )
    {   logger.exception( applicationName + ':index:initializeServices:An exception occured:[' + ex + ']' );
    }
}


function main ()
{   try
    {   logger.trace( applicationName + ':index:main:Starting' );
        setRouting();
        initializeServices();
        logger.trace( applicationName + ':index:main:Done' );
    }
    catch ( ex )
    {   logger.exception( applicationName + 'index:main:An exception Occurred:[' + ex + ']' );
    }
}
/* --------------------------------- End Functions   -------------------------*/


module.exports = app.listen( ApplicationPort );
main();


/* LOG:
*/
