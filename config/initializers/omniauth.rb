Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
  provider :facebook, Encuentratumascota::Config::FACEBOOK_KEY, Encuentratumascota::Config::FACEBOOK_SECRET
  provider :twitter, Encuentratumascota::Config::TWITTER_KEY, Encuentratumascota::Config::TWITTER_SECRET
end
