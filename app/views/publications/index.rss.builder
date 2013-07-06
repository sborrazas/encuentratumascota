xml.instruct! :xml, version: '1.0'
xml.rss version: '2.0' do
  xml.channel do
    xml.title 'Encuentra tu Mascota'
    xml.description t('general.tagline')
    xml.link publications_url

    @publications.each do |publication|
      xml.item do
        xml.title publication.pet_name
        xml.description publication.description
        xml.pubDate publication.created_at.to_s(:rfc822)
        xml.link publication_url(publication)
        xml.guid publication_url(publication)
      end
    end
  end
end
