# Creating default breeds
breeds = File.open(File.join(File.dirname(__FILE__), 'breeds.txt')).read.gsub(/\n/, '').split(',')
breeds.each do |breed_name|
  puts "Find or create `#{breed_name}`"
  Breed.find_or_create_by_name(breed_name)
end
