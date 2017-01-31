require "open-uri"
require "armadillo"
require "json"
require "rack"
require "sequel"
require "webapp/contexts/web_context"
require "webapp/contexts/extensions/path_builder"
require "resources/root"
require "lib/encuentratumascota/client"
require "lib/utils/s3_client"

module Webapp
  module Helpers

    include Contexts::Extensions::PathBuilder

    # Render no content and halt.
    def no_content!
      res.headers.delete("Content-Type")
      res.status = 204
      halt(res.finish)
    end

    # Render a 404 page into the response and halt.
    def not_found!
      if accept?("text/html")
        render_file("public/404.html", 404, false)
      else
        res.headers.delete("Content-Type")
        res.status = 404
        halt(res.finish)
      end
    end

    # Halt the execution of a route handler and redirect.
    #
    # @param path [String]
    # @param params [Hash] ({})
    def redirect!(path, params = {})
      params = params.empty? ? "" : "?#{URI.encode_www_form(params)}"
      res.redirect("#{path}#{params}")
      halt(res.finish)
    end

    # Render and append the specified view with the given locals in the response
    # body content.
    #
    # @param view_path [String]
    # @param locals [Hash] ({})
    def render_view(view_path, locals = {})
      content = Armadillo.render(view_path, locals, {
        :escape_html => true,
        :scope => template_context,
        :base_path => File.join(WEBAPP_DIR, "views")
      })
      res.write(content)
      halt(res.finish)
    end

    # Render and append the object by its JSON serialization.
    #
    # @param object [Object]
    #   An object that must be able to be serialized into JSON.
    def render_json(object, status_code = 200)
      res["Content-Type"] = "application/json"
      res.write(JSON.generate(object))
      res.status = status_code
      halt(res.finish)
    end

    # Get the Hash from the params namespaced by the specified string.
    #
    # @param namespace [String]
    #
    # @return [Hash]
    def form_params
      params = if req.form_data?
        req.params["payload"]
      else
        JSON.parse(req.env["rack.input"].read)["payload"]
      end

      params.kind_of?(Hash) ? params : {}
    rescue JSON::ParserError
      {}
    end

    # Get the current request path.
    #
    # @return [String]
    def current_path
      env["REQUEST_PATH"].gsub(%r{/$}, "")
    end

    # Render a file to the response.
    #
    # @param path [String]
    #   The relative file path.
    # @param status_code [Fixnum]
    # @param cached [Boolean] (false)
    #   If true, the response might return a 304.
    def render_file(path, status_code = 200, cached = false)
      file = Rack::File.new(nil)
      file.path = path
      status, headers, body = file.serving(env)
      unless cached
        headers.delete("Last-Modified")
      end
      halt([status, headers, body])
    end

    # Determine if the request includes the Mime-Type on the Accepts header.
    #
    # @param mimetype [String]
    #
    # @return [Boolean]
    def accept?(mimetype)
      String(env["HTTP_ACCEPT"]).split(",").any? { |s| s.strip == mimetype }
    end

    # Get a web context object with view helpers.
    #
    # @return [Contexts::WebContext]
    def template_context
      @template_context ||= Contexts::WebContext.new({
        :locales_dir => File.join(WEBAPP_DIR, "locales"),
        :authenticity_token => session[:csrf],
        :environment => Encuentratumascota::Settings::ENVIRONMENT,
      })
    end

    # Determine if the traversal context class matches the class given.
    #
    # @param resource_class [Class]
    # @param subpath [String] ("")
    #   Matches if the remainder of the traversal stack matches the given
    #   subpath.
    #
    # @return [Boolean]
    def resource(resource_class, subpath = "")
      proc do
        if context_resource.kind_of?(resource_class) && context_rest == subpath
          captures.push(context_resource)

          true
        end
      end
    end

    def nested_resource(resource_class)
      context_ancestors.any? { |a| a.instance_of?(resource_class) } ||
        context_resource.instance_of?(resource_class)
    end

    def context
      env["encuentratumascota.traversal-context"] ||= begin
        slices = env["PATH_INFO"].gsub(%r{^/}, "").split("/")

        s3_client = Utils::S3Client.new(
          Encuentratumascota::Settings::S3_KEY,
          Encuentratumascota::Settings::S3_SECRET,
          Encuentratumascota::Settings::S3_REGION,
          Encuentratumascota::Settings::S3_BUCKET,
        )
        root = Encuentratumascota::Resources::Root.new(
          {
            :database_host => Encuentratumascota::Settings::DATABASE_HOST,
            :database_name => Encuentratumascota::Settings::DATABASE_NAME,
            :database_user => Encuentratumascota::Settings::DATABASE_USER,
            :database_password => Encuentratumascota::Settings::DATABASE_PASSWORD,
            :s3_client => s3_client,
          },
          { :session => session },
        )

        root.consume(slices)
      end
    end

    def context_resource
      context[0]
    end

    def context_rest
      context[1].join("/")
    end

    def context_ancestors
      context[2]
    end

    def permission(permission)
      context_resource.authorized?(permission)
    end

  end
end
