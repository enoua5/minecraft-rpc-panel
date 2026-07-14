
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

.ACTION:
