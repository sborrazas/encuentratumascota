class AddCountriesTable < ActiveRecord::Migration
  def up
    create_table :countries do |t|
      t.string :code, limit: 2, null: false, unique: true
      t.string :name, null: false
      t.string :lat, null: false
      t.string :lng, null: false
    end
    add_column :publications, :country_id, :integer
    execute(%Q{
       INSERT INTO countries (code, name, lat, lng)
       VALUES
       ('UY', 'Uruguay', '-34.894802', '-56.165034')
    })
    uruguay_id = execute(%Q(SELECT * FROM countries)).first['id']
    execute(%Q{
      UPDATE publications
      SET country_id = #{uruguay_id}
    })
    change_column :publications, :country_id, :integer, null: false
  end

  def down
    remove_column :publications, :country_id
    drop_table :countries
  end

  def execute(query)
    ActiveRecord::Base.connection.execute(query).to_a
  end
end
