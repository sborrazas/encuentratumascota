require "lib/utils/hash"

class Coercer

  attr_reader :attributes

  def initialize(params)
    @params = coerce_hash(params, :key_type => :string)
    @attributes = {}
  end

  def coerce(name, options = {}, &block)
    output_name = options.fetch(:name, name)

    value = if @params.has_key?(name.to_s)
      @attributes[output_name] = block.call(@params[name.to_s])
    end

    if value.nil? && options.has_key?(:default)
      @attributes[output_name] = options[:default]
    end
  end

  def coerce_attr(name, type, options = {})
    coerce_options = Utils::Hash.slice(options, :name, :default)
    value_options = Utils::Hash.omit(options, :name, :default)

    coerce(name, coerce_options) do |value|
      coerce_value(value, type, value_options)
    end
  end

  private

  def coerce_value(value, type, options = {})
    case type
    when :string then coerce_string(value, options)
    when :symbol then coerce_symbol(value)
    when :integer then coerce_integer(value, options)
    when :array then coerce_array(value, options)
    when :boolean then coerce_boolean(value)
    when :file then coerce_file(value)
    when :date then coerce_date(value, options)
    when :hash then coerce_hash(value, options)
    when :float then coerce_float(value, options)
    else
      raise "Invalid type to coerce: `#{type}`."
    end
  end

  def coerce_boolean(value)
    !! value
  end

  def coerce_string(value, options = {})
    if value
      value = value.to_s
      value = value.strip.gsub(/\s{2,}/, " ") if options[:trim]
      value
    end
  end

  def coerce_symbol(value)
    value = coerce_string(value)

    value && value.to_sym
  end

  def coerce_array(value, options = {})
    value = value.values if value.kind_of?(Hash)
    compact = options.fetch(:compact, false)

    if value.kind_of?(Array)
      value = value.reject(&:nil?) if compact

      value = if (element_type = options[:element_type])
        element_options = options.fetch(:element_options, {})

        value.map do |array_element|
          coerce_value(array_element, element_type, element_options)
        end
      else
        value
      end
      value = value.reject(&options[:reject]) if options.has_key?(:reject)
      value
    else
      []
    end
  end

  def coerce_hash(value, options = {})
    key_type = options[:key_type]
    value_type = options[:value_type]
    key_options = options.fetch(:key_options, {})
    value_options = options.fetch(:value_options, {})
    valid_keys = options[:valid_keys]

    if value.kind_of?(Hash)
      value.each_with_object({}) do |(key, value), coerced_hash|
        key = coerce_value(key, key_type, key_options) if key_type

        if !valid_keys || valid_keys.include?(key)
          value = coerce_value(value, value_type, value_options) if value_type

          coerced_hash[key] = value
        end
      end
    else
      {}
    end
  end

  def coerce_integer(value, options = {})
    value = value.to_s
    if value.match(/\A0|[1-9]\d*\z/)
      value.to_i
    end
  end

  def coerce_file(value, options = {})
    if value.kind_of?(Hash) && !(filename = value[:filename].to_s).empty?
      tempfile = value[:tempfile]
      if tempfile.kind_of?(File) || tempfile.kind_of?(Tempfile)
        {
          :file => tempfile,
          :filename => filename,
          :type => coerce_string(value[:type])
        }
      end
    end
  end

  def coerce_date(value, options = {})
    value = coerce_string(value)
    format = options.fetch(:format, "%Y-%m-%d")

    begin
      Date.strptime(value, options.fetch(:format, format))
    rescue ArgumentError
      nil
    end
  end

  def coerce_float(value, options = {})
    value = value.to_s
    if value.match(/\A-?0|[1-9]\d*(-?\d+)?\z/)
      value.to_f
    end
  end

end
