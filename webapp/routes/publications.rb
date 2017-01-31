require "cuba"
require "resources/publications"
require "resources/publication"

module Webapp
  module Routes
    class Publications < Cuba

      Resources = Encuentratumascota::Resources

      define do
        on get, resource(Resources::Publications),
           permission("list") do |publications|

          render_json(publications.list(req.params))
        end

        on get,
           resource(Resources::Publications, "new"),
           permission("create") do

          render_view("dashboard.html")
        end

        on post,
           resource(Resources::Publications, "new"),
           permission("create") do |publications|

          begin
            render_json(publications.create(form_params))
          rescue Validator::ValidationError => ex
            render_json({ "errors" => ex.errors }, 422)
          end
        end

        on get,
           resource(Resources::Publication),
           accept("application/json"),
           permission("view") do |publication|

          render_json(publication.detail)
        end

        on post,
           resource(Resources::Publication, "inquiry"),
           accept("application/json"),
           permission("inquiry") do |publication|

          render_json(publication.inquiry(form_params))
        end

        on get, resource(Resources::Publication), permission("view") do
          # TODO: Render title & description
          render_view("dashboard.html")
        end

        not_found!
      end

    end
  end
end
