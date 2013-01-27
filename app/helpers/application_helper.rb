module ApplicationHelper
  def title(text, options = {})
    content_for(:title, text)
    "<h1 class=\"main-heading\">#{text}</h1>".html_safe unless options[:visible] == false
  end
end
