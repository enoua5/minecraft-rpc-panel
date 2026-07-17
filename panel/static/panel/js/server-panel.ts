import { client } from "./mcmp-client.js";

client.discover().then((response) => {
    console.log("got response", response);
});
client.makeRpcRequest("minecraft:players").then((response) => {
    console.log("got response", response);
});
client.addEventListener("minecraft:notification/players/joined", console.log);
