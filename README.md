# devcash

> Devcash frontend

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).



## Run a new instance on vultr



### Start a new server
- Select Cloud compute
- At least 2048mb memory
- open the console

### Create new user
``` bash
# add new user
$ adduser username
# give the user sudo permission
$ usermod -aG sudo username
# login as the new user
$ su -- username

```

### Install Redis
```
$ sudo apt update
$ sudo apt install redis-server
# test installation
$ redis-cli ping
```

### Install Postgres
```
$ sudo apt update
$ sudo apt install postgresql
# Run psql as postgres user
$ sudo -u postgres psql

# once in the postgres console, create user, create database, and grant privileges
create role user_name with login password 'mypassword';
create database database_name;
grant all privileges on database database_name to user_name;
```


### Configure systemd service
``` bash
# Enter systemd directory
$ cd ../../etc/systemd/system

# create new service
$ sudo vim devcash.service

# Configure it like this
![Devcash-Service](images/devcash-service.png)

# Test
$ cd
$ sudo systemctl start devcash

# Re-test
$ cd
$ sudo systemctl daemon-reload
$ sudo systemctl restart devcash

#Check status
$ cd
$ sudo systemctl status devcash.service

![Status](/images/status.png)



```



### Install Devcash-Bounty-Platform

``` bash
# Clone Repo
$ https://github.com/BlockDevsUnited/Devcash-Bounty-Platform

# install dependencies
$ npm install


# build for production and launch server
$ npm run build
```

### Configure nginx reverse proxy
