"use strict"

// const fastify = require("fastify")({logger: true})


const routes = async (fastify, options ) => {
    fastify.get('/home', async (req, res)=> {
        return 'Hello World version 2'
       })
}



module.exports = routes