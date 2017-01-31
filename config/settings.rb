require "json"

module Encuentratumascota
  module Settings

    settings = JSON.load(
      File.open(File.join(File.dirname(__FILE__), "settings.json"))
    )

    LOGS_DIR = settings.fetch("logs_dir")
    ENVIRONMENT = settings.fetch("environment")

    APP_URL = settings.fetch("app_url")
    SESSION_SECRET = settings.fetch("session_secret")

    DATABASE_NAME = settings.fetch("database_name")
    DATABASE_USER = settings.fetch("database_user")
    DATABASE_PASSWORD = settings.fetch("database_password")

    S3_KEY = settings.fetch("s3_key")
    S3_SECRET = settings.fetch("s3_secret")
    S3_REGION = settings.fetch("s3_region")
    S3_BUCKET = settings.fetch("s3_bucket")

    FACEBOOK_KEY = settings.fetch("facebook_key")
    FACEBOOK_SECRET = settings.fetch("facebook_secret")

    TWITTER_KEY = settings.fetch("twitter_key")
    TWITTER_SECRET = settings.fetch("twitter_secret")

    MAIL_USERNAME = settings.fetch("mail_username")
    MAIL_PASSWORD = settings.fetch("mail_password")
    MAIL_HOST = settings.fetch("mail_host")
    MAIL_DOMAIN = settings.fetch("mail_domain")
    MAIL_PORT = settings.fetch("mail_port")

  end
end
