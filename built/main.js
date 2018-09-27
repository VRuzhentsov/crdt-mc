// 

import {syncCommand, listenCommand} from "./plumbing.js";

import {chain} from "./commands.js";

const cmd = process.argv[process.argv.length - 1];
const options = {
  downstream: cmd == "downstream",
  upstream: cmd == "upstream"
};

let blockchain = chain.init();
console.log(blockchain);

let tx1 = chain.transaction("max", "hey");
let tx2 = chain.transaction("max", "hey2");

blockchain = chain.block(blockchain, [tx1, tx2]);

console.log(blockchain);

let tx3 = chain.transaction("max", "hey 2");
blockchain = chain.block(blockchain, [tx3]);
console.log("Is blockchain valid?")
chain.verify(blockchain);
console.log(blockchain);
// if (options.upstream) {
//   console.log(" ** Listening updates ...");
//   listenCommand(msg => console.log("MESSAGE", msg));
// }

// if (options.downstream) {
//   console.log(" ** Notifying ...");
//   syncCommand({"data": calcHash(genesis)});
//   process.exit();
// }
