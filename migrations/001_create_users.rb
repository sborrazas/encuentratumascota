Sequel.migration do
  change do
    create_table(:users) do
      primary_key(:id)
      column(:email, String, :null => false)
      column(:crypted_password, String, :size => 255, :null => false)
      column(:provider, String, :size => 63, :null => false, :default => "")
      column(:provider_username, String, :size => 127, :null => false, :default => "")
      column(:private_username, String, :size => 127, :null => false)
      column(:uid, String, :size => 127, :null => false)
      column(:created_at, DateTime, :null => false)
      column(:is_admin, TrueClass, :null => false, :default => false)
      column(:image_url, String, :size => 127, :null => false, :default => "")
    end
  end
end
