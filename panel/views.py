from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render

from .models import AvailableServer

# Create your views here.


@login_required
def index(request) -> HttpResponse:
    servers = AvailableServer.objects.all()
    return render(request, "panel/index.html", {"servers": servers})


@login_required
def server_panel(request, server_id: int) -> HttpResponse:
    server = AvailableServer.objects.get(pk=server_id)
    return render(request, "panel/server-panel.html", {"server": server})
