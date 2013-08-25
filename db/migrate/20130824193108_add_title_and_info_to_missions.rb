class AddTitleAndInfoToMissions < ActiveRecord::Migration
  def change
  	add_column :missions, :title, :string
  	add_column :missions, :info, :string
  end
end
