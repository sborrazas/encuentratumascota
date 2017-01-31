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

    DATABASE_HOST = settings.fetch("database_host")
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

  end
end
