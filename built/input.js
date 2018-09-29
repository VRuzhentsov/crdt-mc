import {createInterface} from "readline";


export function commit (onMessage, onCommit) {
  var commit = createInterface(process.stdin, process.stdout);
  commit.question("commit? (Y/N) > ", (line) => {
    commit.close();
    line.toLowerCase() == "y" ? onCommit() : chat(onMessage, onCommit)
  });
}

export function chat (onMessage, onCommit) {
  var message = createInterface(process.stdin, process.stdout);
  message.question("message > ", (line) => {
    if (line.length > 0) {
      onMessage(line);
      message.close();
      commit(onMessage, onCommit);
    } else {
      message.close();
      chat(onMessage, onCommit);
    }
  });
}