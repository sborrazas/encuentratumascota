Sequel.migration do
  up do
    alter_table(:publications) do
      rename_column(:publication_type, :type)
    end
  end
  down do
    alter_table(:publications) do
      rename_column(:type, :publication_type)
    end
  end
end
