# Encuentra Tu Mascota (v2.0)

## Dev setup

Clone the repo and start the Docker container:
```
$ git clone git@github.com:sborrazas/encuentratumascota.git
$ cd encuentratumascota
$ docker-compose up -d etm_app
```

Run the ansible provisioning scripts on the new instance:
```
$ make ansible-shell
$ ansible-playbook --skip-tags remote -i inventory/development provision.yml
```

Then, start up a new shell and run the Cuba app:
```
$ make shell
$ shotgun -p 9393
```

Then, on a separate shell, install all npm packages and start webpack:
```
$ make shell
$ npm install
$ npm run start
```

## Production setup

Move to the `ansible` directory and run the following commands.

### Setup AWS IAM user

Configure AWS names and identifiers in ansible/aws.yml and run the following
command:

```
$ make aws-user
```

If a new user is created the new AWS credentials will be located in
`ansible/credentials`. These credentials can then be used to
start/stop/terminate EC2 instances and create and delete S3 buckets. These are
the credentials needed to provision and deploy the application.

The easiest way to do this, would be to install the `bs` script and move this
`credentials` file to `ansible/.env`.

### Setup AWS EC2 keypair

You should now create the EC2 keypair if you don't have one already:
```
$ bs make aws-keypair
```

You should now be able to connect to EC2 instances using this keypair located in
the output directory.

### Setup AWS EC2 instance

When the application is not yet running, the provision script will start the EC2
instance and install all the required packages to run the application (nginx,
postgresql, etc).

With your credentials in the environment (or in the `.env` using `bs`) run:
```
$ bs make aws-launch
```

After running this, you should have an EC2 instance running. The Ansible
inventory file where this new EC2 instance was added as a host should be in the
`production` file on the outputs directory.

Move it to the `ansible/inventory/production` file.

### Provision the instance

With the hosts file located in the inventory directory, and the variables set up
in `group_vars/production.yml` with Ansible Vault.

To be able to connect to EC2 hosts, you need to use the keypair that was given
to you by the keypair Ansible playbook. In order to add it to your SSH session,
run the following:

```
$ ssh-add mykey.pem
$ ssh-add -l # Make sure the session is listed
```

Then run the provisioning script:

```
$ make provision
```

## Deploying

For deploying the app, make sure you have the right configuration set on
`ansible/group_vars/production.yml` (use `production.yml.example` as an
example).

Then run:

```
$ make deploy
```
