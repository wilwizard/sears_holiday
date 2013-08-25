module ApplicationHelper

	require 'rexml/document'

	def get_store_info(zip)
		response = Typhoeus.get("http://api.developer.sears.com/v2.1/stores/storeInfo/Sears/json%20/zip/#{zip}?apikey=DYUUXx6lX8yPEzPClbj6U2YWlo5ej4g0")
		body = response.options[:response_body]
		body = JSON.parse(body)
		array = body['showstoreinfo']['getstoreInfo']['Stores']['storelocation']
		array.inject({}) { |hash, a| hash[a['storeinfo']['storeName']]=a['storeinfo']['storeNumber'].to_i; hash }
	end

	def get_offers_with_category(store_number, cat_id)
		Typhoeus.get("http://api.developer.sears.com/v2.1/deals/localAd/Sears/xml /getOffers/unitNum/#{store_number}/categoryId/#{cat_id}?apikey=DYUUXx6lX8yPEzPClbj6U2YWlo5ej4g0")
	end

	def get_offers(store_number = 0)
		response = Typhoeus.get("http://api.developer.sears.com/v2.1/deals/localAd/Sears/xml /getOffers/unitNum/#{store_number}?apikey=DYUUXx6lX8yPEzPClbj6U2YWlo5ej4g0")
		body = response.options[:response_body]
		body = REXML::Document.new(body)
		ads = body.elements[1].elements.to_a
		ads.pop
		ads.inject({}) { |hash, a| hash[a.elements[2].elements[2].text.strip]=a.elements[2].elements[1].text; hash }
	end

end
