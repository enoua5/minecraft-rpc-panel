import { MinecraftServerManagementClient } from "./mcmp-handler";

async function getConnectedClient(): Promise<MinecraftServerManagementClient> {
    const serverId = JSON.parse(
        document.getElementById("server-id")!.textContent
    );
    const socketProtocol = location.protocol === "https:" ? "wss" : "ws";
    const url = `${socketProtocol}://${location.host}/ws/server/${serverId}/`;

    return new Promise<MinecraftServerManagementClient>((resolve) => {
        const client = new MinecraftServerManagementClient(url, {
            onOpen: () => resolve(client),
            onClose: () => {
                location.href = "/";
            },
        });
    });
}

export const client = await getConnectedClient();
// @ts-ignore here for testing
window.mcsmp_client = client;
