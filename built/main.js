// 

import {findIp, syncCommand, listenCommand} from "./plumbing.js";

import {chain} from "./commands.js";
import {hash} from "./tools.js";
import {chat} from "./input.js";

let nodeId = hash(findIp());

console.log(" *** Your nodeId: " + nodeId);

const cmd = process.argv[process.argv.length - 1];
const options = {
  downstream: cmd == "downstream",
  upstream: cmd == "upstream"
};

let blockchain = chain.init();
let txs = [];
function loop () {
  chat((msg) => txs.push(chain.transaction(nodeId, msg)),
       () => {
	 console.log("Commiting transactions: " + txs.length);
	 blockchain = chain.block(blockchain, txs);
	 txs = [];
	 syncCommand({"data": blockchain});
	 loop();
       });
}

if (options.upstream) {
  console.log(" ** Listening updates ...");
  listenCommand(msg => console.log("MESSAGE", msg));
}

if (options.downstream) {
  loop();
}



// console.log(blockchain);

// let tx3 = chain.transaction("max", "hey 2");
// blockchain = chain.block(blockchain, [tx3]);
// console.log("Is blockchain valid?")
// chain.verify(blockchain);
// console.log(blockchain);
