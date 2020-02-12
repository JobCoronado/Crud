const express = require("express");
const app = express();
const moviesApi = require("./routes/movies")
const { logErrors, wrapErrors, errorHandler  } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');


//Middkeware
app.use(express.json());

//routes
moviesApi(app);

//Error
app.use(notFoundHandler);

app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(3000,function(){
    console.log(`Listening http://localhost:${3000}`);
})