import * as Sentry from '@sentry/browser';


function init() {

    Sentry.init({dsn: "https://1b37d9a991124d07b6cefd33239ee5a6@sentry.io/2668753"});

}

function log(error){

    console.log("Logging Error", error);
}

export default {
init,
log

}