Mission.destroy_all
User.destroy_all

File.foreach(File.join(Rails.root, 'missions.csv')) do |mission|
	Mission.create(:statement => mission.chomp, :title => Faker::Lorem.words(3))
end

