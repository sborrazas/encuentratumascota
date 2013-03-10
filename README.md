# Encuentra Tu Mascota

## Initialize Project
```
$ git clone git@github.com:sborrazas/encuentratumascota.git
$ cd encuentratumascota
$ bundle install
$ cp config/database.yml.example config/database.yml
$ cp config/settings.json.example config/settings.json
# ...
# Populate config/settings.json
# ...
$ bundle exec rake db:create
$ bundle exec rake db:migrate
$ bundle exec rails s
```
