class CreateMissions < ActiveRecord::Migration
  def change
    create_table :missions do |t|
    	t.string :statement
    	t.references :user
      t.timestamps
    end
  end
end
