// @flow

import {syncCommand, listenCommand} from "./plumbing.js";
import {calcHash, genesis} from "./struct.js";

const cmd = process.argv[process.argv.length - 1];
const options = {
  downstream: cmd == "downstream",
  upstream: cmd == "upstream"
};

if (options.upstream) {
  console.log(" ** Listening updates ...");
  listenCommand(msg => console.log("MESSAGE", msg));
}

if (options.downstream) {
  console.log(" ** Notifying ...");
  syncCommand({"data": calcHash(genesis)});
  process.exit();
}
