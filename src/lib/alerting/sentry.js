const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

// or use es6 import statements
// import * as Tracing from '@sentry/tracing';
function alert() {
    Sentry.init({
        dsn: "https://a90dcbb5413b4dbf8d385b9815bda7ba@o447857.ingest.sentry.io/5428314",
        tracesSampleRate: 1.0,
    });
}
module.exports = alert