import {SHA256} from "crypto-js";

type Transaction = {
  amount : number
}

type Block = {
  timestamp : number;
  hash : string | null,
  prevHash : string | null,
  nonce : number,
  index : number,
  data : Transaction
}


function mine(difficulty) {

}

function calcHash(block : Block): string {
  return SHA256([
    block.timestamp,
    block.hash,
    block.prevHash,
    block.nonce,
    block.index,
    JSON.stringify(block.data)
  ].map(p => p != null ? p.toString() : "").join("")).toString();
}


let genesis : Block = {
  timestamp: 1,
  hash: null,
  prevHash: null,
  nonce: 0,
  index: 0,
  data : {amount: 0}
};
