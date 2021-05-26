ActionMailer::Base.smtp_settings = {
  address: Encuentratumascota::Settings::MAIL_HOST,
  port: Encuentratumascota::Settings::MAIL_PORT,
  domain: Encuentratumascota::Settings::MAIL_DOMAIN,
  user_name: Encuentratumascota::Settings::MAIL_USERNAME,
  password: Encuentratumascota::Settings::MAIL_PASSWORD,
  authentication: 'plain',
  enable_starttls_auto: true
}
