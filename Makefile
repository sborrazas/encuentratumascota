BASE_DIR = $(shell pwd)

DOCKER_OPTS ?=

################################################################################
# Makefile API
################################################################################

.PHONY: start
start:
	docker-compose up

.PHONY: shell
shell:
	$(call execute_with_keys, /bin/bash)

.PHONY: live-shell
live-shell:
	docker-compose exec $(DOCKER_OPTS) etm_ansible /bin/bash

.PHONY: deps
deps:
	$(call execute_with_keys, bundle install)

.PHONY: stop
stop:
	docker-compose stop

define execute_with_keys
	docker-compose run --rm \
										 $(DOCKER_OPTS) \
										 etm_app \
										 /bin/bash -c "eval \`ssh-agent -s\` && \
																	 ssh-add ~/.ssh/id_rsa && \
																	 $(1)"
endef

.PHONY: ansible-shell
ansible-shell:
	docker-compose run --rm $(DOCKER_OPTS) etm_ansible
