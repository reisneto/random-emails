const pino = require('pino');

module.exports = pino({    
    level: process.env.LOGGER_LEVEL || "info",
    name: 'random-emails',
    prettyPrint: {
        levelFirst: true,
        colorize: true
    }
})