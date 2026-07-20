from functools import cached_property
import os
from pathlib import Path

from django.db import models
from django.conf import settings

# Create your models here.


class ServerConfigurationException(Exception):
    """An exception in the server configuration"""


class MissingServerApiKeyException(ServerConfigurationException):
    """The configured server does not have an API key set"""


class AvailableServer(models.Model):
    """A server available to manage"""

    class Meta:
        ordering = ["-created_at"]

    name = models.CharField("Server display name")
    """The displayed name of the server"""
    created_at = models.DateTimeField(auto_now_add=True)
    """The time the server was added to the list"""
    updated_at = models.DateTimeField(auto_now=True)
    """The time the server config was last modified"""
    path = models.FilePathField(
        "Server file path",
        path="/home/server/minecraft",
        match="server.properties",
        recursive=True,
        null=True,
        blank=True,
    )
    """
    The path to the server folder or its `server.properties` file
    
    Will read `server.properties` to determine host/port/key if not set in database
    """
    hostname = models.CharField("Server domain", null=True, blank=True)
    """The hostname for the server, defaults to `localhost` if not set here or in `server.properties`"""
    port = models.IntegerField("RPC port", null=True, blank=True)
    """The port for the RPC server, defaults to `25585` if not set here or in `server.properties`"""
    api_key = models.CharField("RPC API key", null=True, blank=True)
    """The API key to use to connect to the RPC server, defaults to value in `server.properties`"""

    def __str__(self):
        return self.name

    @cached_property
    def server_properties_path(self) -> Path | None:
        """Get the path to `server.properties`"""
        if not self.path:
            return None
        if os.path.isdir(self.path):
            full_path = Path(self.path) / "server.properties"
            if os.path.exists(full_path) and not os.path.isdir(full_path):
                return full_path
            return None
        if os.path.exists(self.path) and not os.path.isdir(self.path):
            return Path(self.path)
        return None

    @cached_property
    def server_properties(self) -> dict[str, str | None]:
        """Get the server.properties values"""
        props: dict[str, str | None] = {}

        if not self.server_properties_path:
            return props

        with open(self.server_properties_path, "r", encoding="utf-8") as f:
            for line in f.readlines():
                if line.strip().startswith("#"):
                    continue
                parts = line.strip().split("=", 1)
                name = parts[0].strip()
                value = (parts[1].strip() or None) if len(parts) > 1 else None
                if name:
                    props[name] = value

        return props

    def getHostname(self) -> str:
        """Get the server hostname"""
        if self.hostname:
            return self.hostname
        props_hostname = self.server_properties.get("management-server-host")
        return props_hostname or "losthost"

    def getPort(self) -> int:
        """Get the server port"""
        if self.port:
            return self.port
        props_port = self.server_properties.get("management-server-port")
        if props_port and props_port.isnumeric() and int(props_port) > 0:
            return int(props_port)
        return 25585

    def getApiKey(self) -> str:
        """Get the server API key"""
        if self.api_key:
            return self.api_key
        props_key = self.server_properties.get("management-server-secret")
        if props_key:
            return props_key
        raise MissingServerApiKeyException
