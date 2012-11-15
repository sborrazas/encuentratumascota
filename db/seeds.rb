# Creating default breeds
%w(Labrador Beagle Otra).each do |breed_name|
  puts "Find or create `#{breed_name}`"
  Breed.find_or_create_by_name(breed_name)
end
