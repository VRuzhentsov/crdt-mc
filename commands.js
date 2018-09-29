import {Genesis, Block, Transaction, Blockchain} from "./struct.js";
import {addBlock, blockHash} from "./tools.js";

function init() {
  return {chain: [Genesis]};
}

function transaction(author : string, message : string) : Transaction {
  let ts = Date.now();
  return {
    message: message,
    author: author,
    timestamp : ts
  }
}

function block(bc : Blockchain, txs : Array<Transaction>):  Blockchain {
  let prev = bc.chain[bc.chain.length - 1];
  let block : Block = {
    index: bc.chain.length,
    txs: txs,
    prevHash: prev.hash,
    hash: null
  };

  return addBlock(bc, block);
}

function verify(bc : Blockchain) {
  for (var i = 1; i < bc.chain.length; i += 1 ) {
    let block = bc.chain[i];
    if (blockHash(block) !== block.hash) {
      console.log("FATAL: block #" + block.index + " is corrupted");
      return false;
    }
  }
  return true;
}

export var chain = {
  transaction: transaction,
  block: block,
  init: init,
  verify: verify
}