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
end
