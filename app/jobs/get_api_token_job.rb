require 'pet_token_requester'

class GetApiTokenJob < ActiveJob::Base
    def perform
        PetTokenRequester.token
    end
end