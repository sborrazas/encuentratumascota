# Load config settings
if File.exists?(File.expand_path('development_settings.rb', File.dirname(__FILE__)))
  require File.expand_path('development_settings.rb', File.dirname(__FILE__))
else
  warn('WARNING: "config/development_settings.rb" not found')
end

require File.expand_path('settings', File.dirname(__FILE__))

# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Encuentratumascota::Application.initialize!
