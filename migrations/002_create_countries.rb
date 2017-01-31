Sequel.migration do
  change do
    create_table(:countries) do
      column(:code, String, {
        :size => 2,
        :null => false,
        :fixed => true,
        :primary_key => true
      })
      column(:name, String, :size => 63, :null => false)
      column(:lat, String, :size => 31, :null => false)
      column(:lng, String, :size => 31, :null => false)
    end
  end
end
