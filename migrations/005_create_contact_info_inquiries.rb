Sequel.migration do
  change do
    create_table(:contact_info_inquiries) do
      primary_key(:id)
      foreign_key(:user_id, :users, :null => false)
      foreign_key(:publication_id, :publications, :null => false)
      column(:created_at, DateTime, :null => false)
    end
  end
end
