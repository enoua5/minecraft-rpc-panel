
start: .ACTION .venv/bin/python .venv/touchfile
	python manage.py migrate
	npm install
	npx webpack --mode production
	.venv/bin/python manage.py collectstatic --noinput
	.venv/bin/python -m uvicorn --port 8500 minecraft_admin_portal.asgi:application

dev: .ACTION .venv/bin/python .venv/touchfile
	DEBUG=TRUE parallel -u ::: "npm run dev" ".venv/bin/python manage.py runserver"

# Venv init
.venv/bin/python:
	test -d .venv || python3 -m venv .venv

.venv/bin/pip-compile: .venv/bin/python
	.venv/bin/python -m pip install pip-tools

# Lockfile
update: .ACTION requirements.in .venv/bin/pip-compile
	.venv/bin/pip-compile --upgrade --output-file requirements.txt

requirements.txt: requirements.in .venv/bin/pip-compile
	.venv/bin/pip-compile --output-file requirements.txt

# Installed requirements
sync-requirements: .ACTION install
install: .venv/touchfile
.venv/touchfile: requirements.txt .venv/bin/python
	.venv/bin/pip install -Ur requirements.txt
	touch .venv/touchfile

# Tools
.venv/bin/black: .venv/bin/python
	.venv/bin/python -m pip install black

format: .ACTION .venv/bin/black
	.venv/bin/black .
	npx prettier --write **/*.ts **/*.mts

.ACTION:
