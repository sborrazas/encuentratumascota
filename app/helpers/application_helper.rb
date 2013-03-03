require 'digest/md5'

module ApplicationHelper
  def title(text, options = {})
    content_for(:title, text)
    "<h1 class=\"main-heading\">#{text}</h1>".html_safe unless options[:visible] == false
  end

  def display_errors(errors)
    return if !errors || errors.none? {|_, e| e.any? }

    formatted_errors = errors.map do |field, messages|
      content_tag(:li, "<strong>#{field.to_s.humanize}</strong> - #{messages.join(', ')}".html_safe)
    end.join.html_safe

    %Q{
      <div class="alert error">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        #{formatted_errors}
      </div>
    }.html_safe
  end

  def current_user_image
    url = if current_user.image_url.empty?
      if current_user.email.empty?
        '/assets/default_user.png'
      else
        hash = Digest::MD5.hexdigest(current_user.email.downcase)
        default_img = "#{request.protocol}#{request.host_with_port}/assets/default_user.png"
        "http://www.gravatar.com/avatar/#{hash}?d=#{u(default_img)}"
      end
    else
      current_user.image_url
    end
    image_tag(url, alt: current_user.display)
  end

  def publication_type_options
    @publication_type_options ||= Publication::PUBLICATION_TYPES.map do |type|
      [t("models.publication.publication_types.#{type}"), type]
    end
  end

  def breed_options
    [[t('models.publication.blank_breed_text'), nil]] + Breed.sorted.all.map {|b| [b.name, b.id] }
  end
end
