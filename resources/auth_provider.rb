require "resources/base"

module Encuentratumascota
  module Resources
    class AuthProvider < Resources::Base

      attr_reader :provider

      def acl
        [
          [Resource::ACL::EVERYONE, "authorize"],
        ]
      end

      def initialize(_provider)
        @provider = _provider
      end

      def authorize(auth)
        email = auth.info.email
        user = client.user_by_provider_and_uid(auth.provider, auth.uid)

        if user
          update_user_with_omniauth(user, auth)
        elsif email && !email.empty? && (user = client.user_by_email(email))
          if !user[:provider].blank?
            append_error(:base, :email_taken)
            check_errors!
          else
            update_user_with_omniauth(user, auth)
          end
        else
          user_id = client.create_user({
            :provider => auth.provider,
            :uid => auth.uid,
            :email => auth.info.email || "",
            :provider_username => auth.info.nickname || "",
            :image_url => auth.info.image || ""
          })
          user = client.user_by_id(user_id)
        end

        user
      end

      private

      def update_user_with_omniauth(user, auth)
        client.update_user(user[:id], {
          :provider => auth.provider,
          :uid => auth.uid,
          :provider_username => auth_field(auth, :nickname, user[:provider_username]),
          :email => auth_field(auth, :email, user[:email]),
          :image_url => auth_field(auth, :image, user[:image_url])
        })
      end

      def auth_field(auth, field_name, default)
        field = auth.info.send(field_name)
        field && !field.empty? ? field : default
      end

    end
  end
end
