require "resources/base"
require "resources/auth_provider"
require "lib/utils/password"

module Encuentratumascota
  module Resources
    class Auth < Base

      COUNTRIES_CODES = [
        "AR",
        "CL",
        "PE",
        "UY",
      ]
      EMAIL_MAX_LENGTH = 63
      PASSWORD_MIN_LENGTH = 6
      PASSWORD_MAX_LENGTH = 63

      def acl
        [
          [Resource::ACL::EVERYONE, "view"],
          [Resource::ACL::EVERYONE, "country"],
          [Resource::ACL::EVERYONE, "create"],
          [Resource::ACL::EVERYONE, "login"],
          [Resource::ACL::EVERYONE, "signout"],
        ]
      end

      def [](key)
        case key
        when "twitter"
          Resources::AuthProvider.new("twitter", settings, request)
        when "facebook"
          Resources::AuthProvider.new("facebook", settings, request)
        else
          super(key)
        end
      end

      def validate
        validate_presence(:email)
        validate_presence(:password)

        if errors.empty? && !valid_credentials?
          append_error(:email, :invalid_credentials)
          append_error(:password, :invalid_credentials)
        end
      end

      def detail
        if current_user
          {
            :signed_in => true,
            :user => current_user,
            :country_code => country_code,
          }
        else
          {
            :signed_in => false,
            :country_code => country_code,
          }
        end
      end

      def create(params)
        attrs = coerce_params(params) do |coercer|
          coercer.coerce_attr(:email, :string)
          coercer.coerce_attr(:password, :string)
          coercer.coerce_attr(:private_username, :string)
        end

        validate_block(attrs) do |validator|
          validator.validate_attr(:email, :presence)
          validator.validate_attr(:email, :email_format)
          validator.validate_attr(:email, :length, :max => EMAIL_MAX_LENGTH)

          validator.validate_attr(:password, :presence)
          validator.validate_attr(:password, :length, {
            :min => PASSWORD_MIN_LENGTH,
            :max => PASSWORD_MAX_LENGTH,
          })
          validator.validate_attr(:private_username, :presence)
        end

        validate_block(attrs) do |validator|
          validator.validate_attr(:email, :uniqueness) do |email|
            !client.email_exists?(email)
          end
          validator.validate_attr(:private_username, :uniqueness) do |username|
            !client.private_username_exists?(username)
          end
        end

        attrs[:crypted_password] = Utils::Password.generate_digested_password(
          attrs.delete(:password)
        )
        attrs[:uid] = ""
        attrs[:created_at] = Time.now.utc

        id = client.create_user(attrs)

        set_current_user({
          :id => id,
          :username => attrs[:private_username],
          :is_admin => false,
        })

        detail
      end

      def login(params)
        attrs = coerce_params(params) do |coercer|
          coercer.coerce_attr(:email, :string)
          coercer.coerce_attr(:password, :string)
        end

        validate_block(attrs) do |validator|
          validator.validate_attr(:email, :presence)
          validator.validate_attr(:password, :presence)
        end

        user = client.user_by_email_or_username(attrs.fetch(:email))

        validate_block(attrs) do |validator|
          validator.validate_all_attrs([:email, :password]) do |email, password|
            if user &&
               Utils::Password.password_matches?(
                 attrs.fetch(:password), user[:crypted_password])

              {}
            else
              {
                :email => [:invalid],
                :password => [:invalid],
              }
            end
          end
        end

        set_current_user({
          :id => user[:id],
          :username => user[:private_username] || user[:email],
          :is_admin => user.fetch(:is_admin),
        })

        detail
      end

      def signout(params)
        delete_current_user

        detail
      end

      def country(params)
        attrs = coerce_params(params) do |coercer|
          coercer.coerce_attr(:country_code, :string)
        end

        validate_block(attrs) do |validator|
          validator.validate_attr(:country_code, :presence)
          validator.validate_attr(:country_code, :inclusion, {
            :items => COUNTRIES_CODES,
          })
        end

        set_country_code(attrs.fetch(:country_code))

        detail
      end

    end
  end
end
