export default function ({ req, route }) {
    if (process.server) {
        process.env.CANONICAL_URL = req.protocol + '://' + req.get('host') + route.path
        return
    }
    process.env.CANONICAL_URL = window.location.protocol + "//" + window.location.host + route.path;
} 