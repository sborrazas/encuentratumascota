Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
  provider :facebook, "429668690427736", "c2fc81da7f62ec3fbbd93d0b124fcc79", scope: 'email,user_location'
  provider :twitter, "eszrV8zACMtQzQmDfS5yUA", "s0FPrxLOymXlrel6h2aPONiqiVI7vKuHEVuPPz1YAA"
end
