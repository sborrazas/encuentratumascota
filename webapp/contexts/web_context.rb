require "armadillo"
require "webapp/contexts/extensions/text"
require "webapp/contexts/extensions/i18n"

module Contexts
  class WebContext

    attr_reader :authenticity_token
    attr_reader :current_user
    attr_reader :environment
    attr_reader :templates_dir

    # TODO: Remove
    include Contexts::Extensions::Text
    include Contexts::Extensions::I18n

    def initialize(options = {})
      @authenticity_token = options.fetch(:authenticity_token)
      @environment = options.fetch(:environment)
      @current_user = options.fetch(:current_user)
      @templates_dir = options.fetch(:templates_dir)
    end

    def development?
      environment == "development"
    end

    def json(object)
      JSON.generate(object)
    end

    def iterate_collection(collection, &block)
      collection.fetch("items").each(&block)
    end

    def collection_empty?(collection)
      collection.fetch("items").empty?
    end

    def is_admin?
      current_user && current_user.fetch(:is_admin)
    end

    def form_field(fields, errors, field_name, field_type, locals = {})
      array_field = field_name.kind_of?(Array)
      value = if array_field
        field_name.each_with_object({}) do |field_name, values|
          values[field_name] = fields.fetch(field_name)
        end
      else
        fields.fetch(field_name)
      end
      errors = if array_field
        field_name.each_with_object({}) do |field_name, values|
          values[field_name] = errors.fetch(field_name, [])
        end
      else
        errors.fetch(field_name, [])
      end

      locals = locals.merge({
        :id => field_name,
        :errors => errors,
        :name => array_field ? "payload" : "payload[#{field_name}]",
        :value => value,
      })

      Armadillo.render("shared/fields/#{field_type}.html", locals, {
        :base_path => templates_dir,
        :escape_html => true,
        :scope => self,
      })
    end

  end
end
