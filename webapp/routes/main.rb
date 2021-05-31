require "cuba"
require "lib/validator"
require "resources/root"
require "resources/publications"
require "resources/breeds"
require "resources/auth"
require "resources/admin/main"
require "webapp/routes/admin"
require "webapp/routes/publications"

module Webapp
  module Routes
    class Main < Cuba

      Resources = Encuentratumascota::Resources

      define do
        on get, resource(Resources::Root), permission("list") do |root|
          publications = root.list(req.params)

          render_view("dashboard.html", :publications => publications)
        end

        on get, "how-it-works" do
          render_view("how_it_works.html")
        end

        on nested_resource(Resources::Publications) do
          run(Webapp::Routes::Publications)
        end

        on nested_resource(Resources::Admin::Main) do
          run(Webapp::Routes::Admin)
        end

        on get, resource(Resources::Breeds), permission("list") do |breeds|
          render_json(
            breeds.list(
              "page" => req.params["page"],
              "per_page" => req.params["per_page"]
            )
          )
        end

        on get, resource(Resources::Auth), permission("view") do |auth|
          render_json(auth.detail)
        end

        on post, resource(Resources::Auth), permission("create") do |auth|
          begin
            render_json(auth.create(form_params))
          rescue Validator::ValidationError => ex
            render_json({ "errors" => ex.errors }, 422)
          end
        end

        on post,
           resource(Resources::Auth, "login"),
           permission("login") do |auth|
          begin
            render_json(auth.login(form_params))
          rescue Validator::ValidationError => ex
            render_json({ "errors" => ex.errors }, 422)
          end
        end

        on post,
           resource(Resources::Auth, "signout"),
           permission("signout") do |auth|
          begin
            render_json(auth.signout(form_params))
          rescue Validator::ValidationError => ex
            render_json({ "errors" => ex.errors }, 422)
          end
        end

        on post,
           resource(Resources::Auth, "country"),
           permission("country") do |auth|
          begin
            render_json(auth.country(form_params))
          rescue Validator::ValidationError => ex
            render_json({ "errors" => ex.errors }, 422)
          end
        end

        not_found!
      end

    end
  end
end
