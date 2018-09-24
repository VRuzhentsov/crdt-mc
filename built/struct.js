import {SHA256} from "crypto-js";




function mine(difficulty) {

}

function calcHash(block) {
  return SHA256([
    block.timestamp,
    block.hash,
    block.prevHash,
    block.nonce,
    block.index,
    JSON.stringify(block.data)
  ].map(p => p != null ? p.toString() : "").join("")).toString();
}


let genesis = {
  timestamp: 1,
  hash: null,
  prevHash: null,
  nonce: 0,
  index: 0,
  data : {amount: 0}
};
