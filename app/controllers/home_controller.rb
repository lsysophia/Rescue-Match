class HomeController < ApiController
    before_action :require_login

    def pets
        uri = URI(`https://api.petfinder.com/v2/animals?location=#{@user.zipcode}`)

        Net::HTTP.start(uri.host, uri.port) do |http|
            request = Net::HTTP::Get.new uri

            request.headers = {
                'Authorization': `Bearer #{ENV["PET_TOKEN"]}`
            }

            response = http.request(request)
            render json: JSON.parse(response.body)
        end
            
        # net http to make get request with token
        # return that reponse to frontend
    end

    private

    def set_user
        @user = User.find_by!(auth_token: request.headers[:token])
    end
end