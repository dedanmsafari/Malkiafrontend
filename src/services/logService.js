// import * as Sentry from '@sentry/browser';


function init() {
// Sentry.init({dsn: "https://7cfc55fb00514b4fa816be36f3f04679@sentry.io/1778006"});

}

function log(error){

    console.log("Logging Error", error);
}

export default {
init,
log

}