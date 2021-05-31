require "cuba"
require "rack/protection"

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
Cuba.plugin(Webapp::Helpers)

Cuba.define do
  begin
    run(Webapp::Routes::Main)
  rescue Resource::NotFound => ex
    not_found!
  rescue Exception => ex
    if environment != "development"
      ErrorNotifiers::RackError.new(ex, env, {
        :templates_dir => File.join(APP_DIR, "notifiers"),
        :environment => environment,
        :logs_dir => Encuentratumascota::Settings::LOGS_DIR,
      }).log
      render_file("public/500.html", 500)
    else
      raise ex
    end
  end
end
