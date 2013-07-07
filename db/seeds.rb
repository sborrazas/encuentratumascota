# Creating default breeds
breeds = File.read(File.join(File.dirname(__FILE__), 'breeds.txt')).gsub(/\n/, '').split(',')
breeds.each do |breed_name|
  puts "Find or create `#{breed_name}`"
  Breed.find_or_create_by_name(breed_name)
end

# Creating default countries
CSV.foreach(File.join(File.dirname(__FILE__), 'countries.csv')) do |row|
  puts "Create or update `#{row[0]}` (`#{row[1]}`)"
  if (country = Country.where(code: row[0]).first).nil?
    Country.create!(code: row[0], name: row[1], lat: row[2], lng: row[3])
  else
    country.update_attributes(name: row[1], lat: row[2], lng: row[3])
  end
end
