Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
  provider :facebook, Encuentratumascota::Settings::FACEBOOK_KEY, Encuentratumascota::Settings::FACEBOOK_SECRET
  provider :twitter, Encuentratumascota::Settings::TWITTER_KEY, Encuentratumascota::Settings::TWITTER_SECRET
end
