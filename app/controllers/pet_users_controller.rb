class PetUsersController < ApiController
    before_action :require_login

    def index
        pet_users = PetUser.All
        render json: { pet_users: pet_users}
    end

    def create
        pet_user = PetUser.create(pet_user_params)

        if (pet_user) { 
            render json: { 
                message: 'ok',
                pet_user: pet_user
            }
        }
        else {
            render json: { message: 'Could not add pet'}
        }
        end
    end

    private
    def pet_user_params
        params.require(:pet_user).permit(:name, :species, :breed, :age, :gender, :size, :photo, :description, :status, :user_id)
    end
end
