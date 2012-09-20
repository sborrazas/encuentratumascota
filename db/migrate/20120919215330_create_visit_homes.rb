class CreateVisitHomes < ActiveRecord::Migration
  def change
    create_table :visit_homes do |t|
      t.string :lat
      t.string :lng

      t.timestamps
    end
  end
end
