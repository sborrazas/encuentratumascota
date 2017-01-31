Sequel.migration do
  change do
    create_table(:newsletter_subscribers) do
      primary_key(:id)
      column(:email, String, :null => false, :size => 63)
      column(:created_at, DateTime, :null => false)
    end
  end
end
