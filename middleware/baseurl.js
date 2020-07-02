export default function ({ req, route }) {
    if (process.server) {
        process.env.CANONICAL_URL = req.get('x-forwarded-proto') ?  req.get('x-forwarded-proto') : req.protocol + '://' + req.get('x-forwarded-host') ? req.get('x-forwarded-host') : req.get('host') + route.path
        process.env.BASE_URL = req.get('x-forwarded-proto') ?  req.get('x-forwarded-proto') : req.protocol + '://' + req.get('x-forwarded-host') ? req.get('x-forwarded-host') : req.get('host')
        return
    }
    process.env.CANONICAL_URL = window.location.protocol + "//" + window.location.host + route.path
    process.env.BASE_URL = window.location.protocol + "//" + window.location.host
} 