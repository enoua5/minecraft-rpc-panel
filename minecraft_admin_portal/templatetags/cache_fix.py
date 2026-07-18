import random
from urllib.parse import parse_qsl, urlencode, urlparse, urlunparse

from django import template
from django.templatetags.static import static

from minecraft_admin_portal.settings import DEBUG

register = template.Library()


@register.simple_tag
def no_cache_static(path: str) -> str:
    """Add a query string to prevent caching in dev"""
    url = static(path)

    if not DEBUG:
        return url
    url_parts = list(urlparse(url))
    query = dict(parse_qsl(url_parts[4]))
    query["cache_prevention"] = str(random.randint(1, 100_000_000))
    url_parts[4] = urlencode(query)
    return urlunparse(url_parts)
