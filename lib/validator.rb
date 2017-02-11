class Validator

  class ValidationError < StandardError

    attr_reader :errors
    attr_reader :attrs

    def initialize(errors, attrs)
      @errors = errors
      @attrs = attrs
    end

  end

  EMAIL_FORMAT = /\A
    ([0-9a-zA-Z\.][-\w\+\.]*)@
    ([0-9a-zA-Z_][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9}\z/x

  attr_reader :attributes

  def initialize(attributes)
    @attributes = attributes
    @errors = Hash.new { |h, k| h[k] = [] }
  end

  def validate(name, &block)
    errors = block.call(@attributes[name])

    @errors[name].concat(errors) if errors.any?

    errors.empty?
  end

  def validate_attr(name, type, options = {}, &block)
    validate(name) { |value| validate_value(value, type, options, &block) }
  end

  def validate_each_attr(name, type, options = {}, &block)
    validate(name) do |array_value|
      if array_value
        errors = array_value.map do |value|
          validate_value(value, type, options, &block)
        end
        errors.flatten.uniq
      else
        []
      end
    end
  end

  def validate_all_attrs(names, &block)
    values = names.map { |name| @attributes[name] }
    errors_map = block.call(*values)

    errors_map.each do |name, errors|
      @errors[name].concat(errors) if errors.any?
    end

    errors_map.empty?
  end

  def check_errors!
    if @errors.any?
      raise ValidationError.new(@errors, @attributes)
    end
  end

  private

  def validate_value(value, type, options = {}, &block)
    case type
    when :presence then validate_presence(value)
    when :length then validate_length(value, options)
    when :inclusion then validate_inclusion(value, options)
    when :existence then validate_existence(value, &block)
    when :uniqueness then validate_uniqueness(value, &block)
    when :file_type then validate_file_type(value, options)
    when :file_size then validate_file_size(value, options)
    when :email_format then validate_email_format(value)
    when :format then validate_format(value, options)
    else
      raise "Invalid validation type `#{type}`."
    end
  end

  def validate_presence(value)
    if value.nil? || value.to_s.empty?
      [:blank]
    else
      []
    end
  end

  def validate_length(value, options)
    min = options.fetch(:min, nil)
    max = options.fetch(:max, nil)
    errors = []

    if value
      length = value.size
      if min && length < min
        errors << :too_short
      end
      if max && length > max
        errors << :too_long
      end
    end

    errors
  end

  def validate_inclusion(value, options)
    items = options.fetch(:items)

    if !value || items.include?(value)
      []
    else
      [:not_included]
    end
  end

  def validate_existence(value, &block)
    if !value || block.call(value)
      []
    else
      [:doesnt_exists]
    end
  end

  def validate_uniqueness(value, &block)
    if block.call(value)
      []
    else
      [:already_exists]
    end
  end

  def validate_file_size(value, options)
    max_size = options.fetch(:max_size)

    if value && (File.size(value[:file].path) > max_size)
      [:file_too_big]
    else
      []
    end
  end

  def validate_file_type(value, options)
    types = options.fetch(:types)

    if value && !types.include?(value[:type])
      [:file_invalid]
    else
      []
    end
  end

  def validate_email_format(value)
    validate_format(value, :format => EMAIL_FORMAT)
  end

  def validate_format(value, options)
    if value && !(options.fetch(:format) =~ value)
      [:invalid]
    else
      []
    end
  end

end
