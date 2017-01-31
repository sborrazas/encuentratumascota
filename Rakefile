task :environment do
  require "./initialize"
  require "config/settings"
end

namespace :db do
  desc "Run the migrations"
  task :migrate, [:version] => :environment do |t, args|
    require "sequel"
    puts "DATABASE: #{Encuentratumascota::Settings::DATABASE_NAME}"
    Sequel.extension(:migration)
    db = Sequel.postgres({
      :database => Encuentratumascota::Settings::DATABASE_NAME,
      :user => Encuentratumascota::Settings::DATABASE_USER,
      :password => Encuentratumascota::Settings::DATABASE_PASSWORD
    })
    if args[:version]
      puts "Migrating to version #{args[:version]}"
      Sequel::Migrator.run(db, "migrations", {
        :target => args[:version].to_i
      })
    else
      puts "Migrating to latest"
      Sequel::Migrator.run(db, "migrations")
    end
  end
end

task :console => :environment do
  require "irb"
  require "irb/completion"
  ARGV.clear
  IRB.start
end
