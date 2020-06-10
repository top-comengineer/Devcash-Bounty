export default function ({ req, route }) {
    if (process.server) {
        process.env.CANONICAL_URL = req.protocol + '://' + req.get('host') + route.path
        process.env.BASE_URL = req.protocol + '://' + req.get('host')
        return
    }
    process.env.CANONICAL_URL = window.location.protocol + "//" + window.location.host + route.path
    process.env.BASE_URL = window.location.protocol + "//" + window.location.host
} 