class CreateConsoles < ActiveRecord::Migration[5.2]
  def change
    create_table :consoles do |t|
      t.string :model
      t.integer :user_id
      t.timestamps
    end
  end
end