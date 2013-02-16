ActionMailer::Base.smtp_settings = {
  address: Encuentratumascota::Config::MAIL_HOST,
  port: Encuentratumascota::Config::MAIL_PORT,
  domain: Encuentratumascota::Config::MAIL_DOMAIN,
  user_name: Encuentratumascota::Config::MAIL_USERNAME,
  password: Encuentratumascota::Config::MAIL_PASSWORD,
  authentication: 'plain',
  enable_starttls_auto: true
}
