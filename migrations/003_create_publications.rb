Sequel.migration do
  change do
    create_table(:breeds) do
      primary_key(:id)
      column(:name, String, {
        :size => 63,
        :null => false,
        :text => false,
        :unique => true
      })
    end

    create_table(:publications) do
      primary_key(:id)
      foreign_key(:user_id, :users, :null => false)
      foreign_key(:breed_id, :breeds)
      foreign_key(:country_code, :countries, {
        :null => false,
        :type => String,
        :size => 2,
        :fixed => true
      })
      column(:publication_type, String, :null => false)
      column(:pet_name, String, :null => false)
      column(:description, String, {
        :null => false,
        :default => "",
        :text => true
      })
      column(:sex, String, :null => false)
      column(:status, String, :null => false, :index => true)
      column(:lat, String, :size => 31, :null => false)
      column(:lng, String, :size => 31, :null => false)
      column(:reward, String, {
        :null => false,
        :default => "",
        :text => true
      })
      column(:created_at, DateTime, :null => false, :index => true)
      column(:lost_on, Date, :null => false)
      column(:contact, String, {
        :null => false,
        :default => "",
        :text => true
      })
      column(:slug, String, {
        :null => false,
        :size => 63,
        :unique => true
      })
    end
  end
end
