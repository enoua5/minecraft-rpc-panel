from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("server/<int:server_id>/", views.server_panel, name="server_panel"),
]
