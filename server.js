const express = require('express');
const http = require('http');
const app = require('./app');
const port = 3010; 

const server = http.createServer(app);



server.listen(port, () => {
    console.log(`Server is running on url http://localhost:${port}`);
});

