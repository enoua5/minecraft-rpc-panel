import asyncio

from channels.generic.websocket import AsyncWebsocketConsumer
import websockets
from .models import AvailableServer


class MinecraftRpcProxy(AsyncWebsocketConsumer):

    async def connect(self) -> None:
        if not self.scope.get("user"):
            return

        server_id: int | None = (
            self.scope.get("url_route", {}).get("kwargs", {}).get("server_id")
        )
        if server_id is None:
            return

        server = await AvailableServer.objects.aget(pk=server_id)
        hostname = server.getHostname()
        port = server.getPort()
        api_key = server.getApiKey()

        self.ws = await websockets.connect(
            f"ws://{hostname}:{port}",
            additional_headers={"Authorization": f"Bearer {api_key}"},
            max_size=2**23,
        )

        asyncio.create_task(self.receive_from_server())

        await self.accept()

    async def disconnect(self, code: int) -> None:
        await self.ws.close(code)

    async def receive(
        self, text_data: str | None = None, bytes_data: bytes | None = None
    ) -> None:
        data = bytes_data.decode() if bytes_data else text_data if text_data else None
        if data:
            await self.ws.send(data)

    async def receive_from_server(self) -> None:
        """Handle incoming messages from minecraft RPC"""
        try:
            async for message in self.ws:
                await self.send(
                    text_data=message if isinstance(message, str) else None,
                    bytes_data=message if isinstance(message, bytes) else None,
                )
        except websockets.ConnectionClosed as exc:
            await self.close(exc.code)
