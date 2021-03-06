require "lib/resource"
require "lib/coercer"
require "lib/validator"

module Encuentratumascota
  module Resources
    class Base < Resource

      module ACL
        include Resource::ACL

        AUTHENTICATED = :authenticated
      end

      def country_code
        session[:country_code] ||= "UY" # TODO: remove hardcoded constant
      end

      def current_user
        session[:user]
      end

      private

      def client
        settings[:client] ||= Encuentratumascota::Client.new({
          :host => settings.fetch(:database_host),
          :name => settings.fetch(:database_name),
          :user => settings.fetch(:database_user),
          :password => settings.fetch(:database_password),
        })
      end

      def s3_client
        settings.fetch(:s3_client)
      end

      def session
        request.fetch(:session)
      end

      def set_current_user(user)
        session[:user] = {
          :id => user.fetch(:id),
          :username => user.fetch(:username),
          :email => user.fetch(:email),
          :image_url => user[:image_url],
          :is_admin => user.fetch(:is_admin),
        }
      end

      def set_country_code(country_code)
        session[:country_code] = country_code
      end

      def delete_current_user
        session.delete(:user)
      end

      def coerce_params(params, &block)
        coercer = Coercer.new(params)

        block.call(coercer)

        coercer.attributes
      end

      def validate_block(attributes, &block)
        validator = Validator.new(attributes)

        block.call(validator)

        validator.check_errors!
      end

      def perform_action(action, params = {})
        send(action, params)
      end

      def user_signed_in?
        !! current_user
      end

      def authorized_group?(group)
        super(group) ||
          (group == ACL::AUTHENTICATED && user_signed_in?)
      end

    end
  end
end
