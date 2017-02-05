aws-user:
	ansible-playbook aws_user_setup.yml --ask-vault-pass

aws-keypair:
	ansible-playbook aws_ec2_keypair.yml --ask-vault-pass

aws-launch:
	ansible-playbook aws_ec2_launch.yml --ask-vault-pass

aws-bucket:
	ansible-playbook aws_s3_bucket.yml --ask-vault-pass

aws:
	make aws-user
	make aws-keypair
	make aws-launch

provision:
	ansible-playbook provision.yml --inventory=inventory/production --ask-vault-pass

deploy:
	ansible-playbook deploy.yml --inventory=inventory/production --ask-vault-pass

restore-db:
	ansible-playbook restore_db.yml --inventory=inventory/production --ask-vault-pass
