// 

import {findIp, syncCommand, syncState, listenCommand, listenState} from "./plumbing.js";

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
	 syncState(blockchain);
	 loop();
       });
}

if (options.upstream) {
  console.log(" ** Listening updates ...");
  listenState(msg => {
    if (chain.verify(msg)) {
      console.log("OK: blockchain state has been updated");
      blockchain = msg;
      let messages = [];
      for (var i = 0; i < blockchain.chain.length; i++) {
	for (var j = 0; j < blockchain.chain[i].txs.length; j++) {
	  let tx = blockchain.chain[i].txs[j];
	  messages.push([tx.timestamp, tx.author.slice(-6), tx.message]);
	}
      }
      console.table(messages);
    }
  });
}

if (options.downstream) {
  loop();
}



// // console.log(blockchain);
// let blockchain = chain.init();
// let tx1 = chain.transaction("max", "hey 0");
// let tx2 = chain.transaction("max", "hey 1");
// blockchain = chain.block(blockchain, [tx1, tx2]);
// let tx3 = chain.transaction("max", "hey 2");
// blockchain = chain.block(blockchain, [tx3]);
// //blockchain.chain[1].txs[1].author = "not max";
// console.log("Is blockchain valid?")
// chain.verify(blockchain);
// console.log(JSON.stringify(blockchain, null, 2));
