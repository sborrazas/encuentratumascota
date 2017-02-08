# coding: utf-8

module Contexts
  module Extensions
    module Text

      COUNTRIES_NAMES = {
        "UY" => "Uruguay",
        "PE" => "Perú",
        "AR" => "Argentina",
        "CL" => "Chile",
      }

      # Transform the string from using the underscore notation to using spaces
      # and an uppercase letter on each word.
      #
      # @param text [String]
      #
      # @return [String]
      def titlecase(text)
        text = text.to_s.dup
        text.gsub!("_", " ")
        text.gsub!(/\b(\w)/, &:upcase)
        text
      end

      def country_name(country_code)
        COUNTRIES_NAMES.fetch(country_code)
      end

    end
  end
end
