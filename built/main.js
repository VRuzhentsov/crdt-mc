// 

import {syncCommand, listenCommand} from "./plumbing.js";


//console.log(calcHash(genesis));

listenCommand(msg => console.log("MESSAGE", msg));

// setTimeout(function() {
//   syncCommand({"data": calcHash(genesis)});
// }, 1500);
