module SlugGeneratorService

  module_function

  def generate_slug(raw_slug)
    raise InvalidArguments unless block_given?

    slug = sanitize_slug(raw_slug)

    # Append "-number" to the slug until it's unique
    if yield(slug)
      index = 1
      slug_with_number = "#{slug}-#{index}"
      while yield(slug_with_number)
        index += 1
        slug_with_number = "#{slug}-#{index}"
      end
      slug = slug_with_number
    end

    slug
  end

  def sanitize_slug(dirty_slug)
    slug = dirty_slug.strip.downcase

    # blow away apostrophes
    slug.gsub! /['`]/, ''

    # @ --> at, and & --> and
    slug.gsub! /\s*@\s*/, ' at '
    slug.gsub! /\s*&\s*/, ' and '

    # replace all non alphanumeric, underscore or periods
    slug.gsub! /\s*[^A-Za-z0-9\-]\s*/, '-'

    # convert double underscores to single
    slug.gsub! /\-+/, '-'

    # strip off leading/trailing underscore
    slug.gsub! /\A[\-\.]+|[\-\.]+\z/, ''

    slug
  end
end