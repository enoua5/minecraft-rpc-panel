from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render

from panel.models import AvailableServer

# Create your views here.

@login_required
def index(request) -> HttpResponse:
    servers = AvailableServer.objects.all()
    return render(request, "panel/index.html", { "servers": servers })
