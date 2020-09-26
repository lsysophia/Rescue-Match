require 'net/http'

class PetTokenRequester
    def self.token
        uri = URI('https://api.petfinder.com/v2/oauth2/token')
        request = Net::HTTP::Post.new(uri)

        request.set_form_data(
            "grant_type" => "client_credentials",
            "client_id" => ENV["CLIENT_ID"],
            "client_secret" => ENV["CLIENT_SECRET"]
        )

        Net::HTTP.start(uri.host, uri.port, use_ssl: true) do |http|
            response = http.request(request)

            ENV["PET_TOKEN"] = JSON.parse(response.body)["access_token"]
        end
    end
end