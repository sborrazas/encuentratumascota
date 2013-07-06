xml.instruct! :xml, version: '1.0'
xml.rss version: '2.0' do
  xml.channel do
    xml.title 'Encuentra tu Mascota'
    xml.description t('general.tagline')
    xml.link publications_url(:rss)

    @publications.each do |publication|
      xml.item do
        xml.title publication.pet_name
        xml.description publication.description
        xml.pubDate publication.created_at.to_s(:rfc822)
        xml.link publication_detail_url(publication.slug)
        xml.guid publication_detail_url(publication.slug)
      end
    end
  end
end
