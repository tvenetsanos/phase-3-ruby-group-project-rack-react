class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.string :title
      t.integer :rating
      t.integer :console_id
      t.integer :user_id
      t.timestamps
    end
  end
end
