class CreatePetUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :pet_users do |t|
      t.string :name
      t.string :species
      t.string :breed
      t.string :age
      t.string :gender
      t.string :size
      t.text   :photo
      t.text   :description
      t.string :status
      t.integer :user_id

      t.timestamps
    end
  end
end
