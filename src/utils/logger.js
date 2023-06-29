const winston = require('winston')

const customLevelOptions = {
    levels: {
        fatal:   0,
        error:   1,
        warning: 2,
        info:    3,
        debug:   4
    },
    colors: {
        fatal:   'red',
        error:   'yellow',
        warning: 'yellow',
        info:    'blue',
        debug:   'white'
    }
}

const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winstom.format.colorize({colors: customLevelOptions.colors}),
                winstom.format.simple()
            )
        }),
        new winston.transports.File(),

    ]
})

exports.addLogger = (req, res, next) => {
    req.logger = logger
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleString}`)
    next()
}

exports.logger = logger