require "rack/utils"

module Contexts
  module Extensions
    module PathBuilder

      # Build a relative URL path based on the path and the params.
      #
      # @param path [String]
      # @param params [Hash] ({})
      #
      # @return [String]
      def build_path(path, params = {})
        if params.empty?
          path
        else
          "#{path}?#{Rack::Utils.build_nested_query(params)}"
        end
      end

      # Build an URL based on the path and the params.
      #
      # @param path [String]
      # @param params [Hash] ({})
      #
      # @return [String]
      def build_url(path, params = {})
        "#{::Encuentratumascota::Settings::APP_URL}/#{build_path(path, params)}"
      end

    end
  end
end
