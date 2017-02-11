require "cuba"
require "resources/admin/main"
require "resources/admin/publications"
require "resources/admin/publication"
require "resources/admin/users"
require "resources/admin/user"

module Webapp
  module Routes
    class Admin < Cuba

      Resources = Encuentratumascota::Resources::Admin

      define do
        on get, resource(Resources::Main),
           permission("list") do |publications|

          render_view("admin/publications.html", {
            :publications => publications.list(req.params)
          })
        end

        on get,
           resource(Resources::Publication, "edit"),
           permission("update") do |publication|

          fields = publication.detail

          render_view("admin/publication.html", {
            :publication => fields,
            :errors => {},
            :fields => fields,
            :breeds_options => publication.breeds_options,
          })
        end

        on post,
           resource(Resources::Publication, "edit"),
           permission("update") do |publication|

          begin
            publication.update(form_params)

            redirect!("/admin")
          rescue Validator::ValidationError => ex
            render_view("admin/publication.html", {
              :breeds_options => publication.breeds_options,
              :errors => ex.errors,
              :fields => ex.attrs,
              :publication => publication.detail,
            })
          end
        end

        on get, resource(Resources::Users),
           permission("list") do |users|

          render_view("admin/users.html", {
            :users => users.list(req.params)
          })
        end

        on get,
           resource(Resources::User, "edit"),
           permission("update") do |publication|

          render_view("admin/user.html", {
            :user => user.detail,
          })
        end

        on post,
           resource(Resources::User, "edit"),
           permission("update") do |user|

          begin
            user.update(form_params)

            redirect!("/admin")
          rescue Validator::ValidationError => ex
            # TODO
            render_json({ "errors" => ex.errors }, 422)
          end
        end

        not_found!
      end

    end
  end
end
