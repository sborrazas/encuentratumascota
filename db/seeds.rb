require "./initialize"
require "./webapp/app"
require "csv"

# Creating default breeds
client = Encuentratumascota::Client.new({
  :host => Encuentratumascota::Settings::DATABASE_HOST,
  :name => Encuentratumascota::Settings::DATABASE_NAME,
  :user => Encuentratumascota::Settings::DATABASE_USER,
  :password => Encuentratumascota::Settings::DATABASE_PASSWORD
})

breeds = File.read(File.join(File.dirname(__FILE__), 'breeds.txt')).gsub(/\n/, '').split(',')
breeds.each do |breed_name|
  puts "Find or create `#{breed_name}`"
  if !client.breed_exists_by_name?(breed_name)
    client.create_breed(:name => breed_name)
  end
end

# Creating default countries
CSV.foreach(File.join(File.dirname(__FILE__), 'countries.csv')) do |row|
  puts "Find or create `#{row[0]}` (`#{row[1]}`)"
  country_code = row[0]
  if !client.country_exists_by_code?(country_code)
    client.create_country(:code => country_code, :name => row[1], :lat => row[2], :lng => row[3])
  end
end
