Sequel.migration do
  change do
    create_table(:attachments) do
      primary_key(:id)
      column(:image, String, :size => 127, :null => false)
      foreign_key(:publication_id, :publications, :null => false)
    end
  end
end
