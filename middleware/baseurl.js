export default function ({ req, route }) {
    if (process.server) {
        let proto = req.get('x-forwarded-proto') ?  req.get('x-forwarded-proto') : req.protocol
        let host = req.get('x-forwarded-host') ? req.get('x-forwarded-host') : req.get('host')
        let path = route.path
        process.env.CANONICAL_URL = proto + '://' + host + path
        process.env.BASE_URL = proto + host
        return
    }
    process.env.CANONICAL_URL = window.location.protocol + "//" + window.location.host + route.path
    process.env.BASE_URL = window.location.protocol + "//" + window.location.host
} 