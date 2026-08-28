update-deps:
	pip-compile --upgrade --allow-unsafe requirements/prod.in
	pip-compile --upgrade --allow-unsafe requirements/dev.in

# Updates a single package, useful for updating cumulusci only
# Example usage: make update-package PACKAGE="cumulusci"
update-package:
	pip-compile --allow-unsafe -P $(PACKAGE) --output-file=requirements/prod.txt requirements/prod.in
	pip-compile --allow-unsafe -P $(PACKAGE) --output-file=requirements/dev.txt requirements/dev.in

dev-install:
	pip-sync requirements/*.txt
