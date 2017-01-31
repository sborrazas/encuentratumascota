require "cuba"
require "rack/protection"
require "omniauth-twitter"
require "omniauth-facebook"

require "config/settings"
require "webapp/routes/main"
require "webapp/helpers"
require "lib/validator"
require "lib/error_notifiers/rack_error"

environment = Encuentratumascota::Settings::ENVIRONMENT

Cuba.use(Rack::MethodOverride)
Cuba.use(Rack::ShowExceptions) if environment == "development"
Cuba.use(Rack::Session::Cookie, {
  :secret => Encuentratumascota::Settings::SESSION_SECRET,
  :key => "encuentratumascota.session",
})
Cuba.use(Rack::Protection, {
  :use => [:remote_referrer, :authenticity_token],
  :except => [:remote_token],
})
Cuba.use(OmniAuth::Builder) do
  provider(
    :twitter,
    Encuentratumascota::Settings::TWITTER_KEY,
    Encuentratumascota::Settings::TWITTER_SECRET
  )
  provider(
    :facebook,
    Encuentratumascota::Settings::FACEBOOK_KEY,
    Encuentratumascota::Settings::FACEBOOK_SECRET
  )
end
Cuba.plugin(Webapp::Helpers)

Cuba.define do
  begin
    run(Webapp::Routes::Main)
  rescue Resource::NotFound => ex
    not_found!
  rescue Exception => ex
    if environment != "development"
      ErrorNotifiers::RackError.new(ex, env, {
        :templates_path => File.join(APP_DIR, "notifiers"),
        :logs_path => Encuentratumascota::Settings::LOGS_DIR
      }).log
      render_file("public/500.html", 500)
    else
      raise ex
    end
  end
end