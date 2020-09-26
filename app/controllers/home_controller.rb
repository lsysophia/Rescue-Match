class HomeController < ApiController
    # before_action :require_login

    def index
        uri = URI("https://api.petfinder.com#{params["nextPage"]}")

        Net::HTTP.start(uri.host, uri.port, use_ssl: true) do |http|
            request = Net::HTTP::Get.new uri

            request['Authorization'] = "Bearer #{ENV['PET_TOKEN']}"

            response = http.request(request)

            render json: response.body
        end
    end

    private

    def set_user
        @user = User.find_by!(auth_token: request.headers[:token])
    end
end