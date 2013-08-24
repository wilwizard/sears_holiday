Mission.destroy_all
User.destroy_all

100.times do 
	Mission.create(:statement => Faker::Lorem.sentence(5),
									    :info => Faker::Lorem.sentence(12),
									   :title => Faker::Lorem.sentence(3))
end