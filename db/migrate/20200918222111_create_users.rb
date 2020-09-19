class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :email
      t.string :auth_token
      t.string :name
      t.integer :zipcode
      t.boolean :has_cats
      t.boolean :has_dogs
      t.boolean :has_child
      t.boolean :has_yard
      
      t.timestamps
    end
  end
end
