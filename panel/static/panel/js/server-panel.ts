
import { RpcRequestHandler } from "./rpc-request-handler.js";

(() => {
    function handleConnect() {
        client.discover()
            .then(response => {
                console.log("got response", response)
            });
        client.makeRpcRequest("minecraft:players")
            .then(response => {
                console.log("got response", response)
            });
    }

    function handleSocketClose() {
        location.href = "/";
    }

    const serverId = JSON.parse(document.getElementById('server-id')!.textContent);
    const socketProtocol = location.protocol === "https:" ? "wss" : "ws";
    const socket = new WebSocket(`${socketProtocol}://${location.host}/ws/server/${serverId}/`);
    socket.onclose = handleSocketClose;
    socket.onopen = handleConnect;

    const client = new RpcRequestHandler(socket);
})();
