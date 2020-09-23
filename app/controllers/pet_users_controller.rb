class PetUsersController < ApiController
    before_action :require_login

    def index
        pet_users = PetUser.All
        render json: { pet_users: pet_users}
    end

    def show
        pet_user = PetUser.find_by!(pet_user.id)
        render json: {
            pet_user: pet_user
        }
    end

    def create
        pet_user = PetUser.create!(pet_user_params)
        # pet_user.user = current_user
        if (pet_user)
            render json: { 
                message: 'ok',
                pet_user: pet_user
            }
        else
            render json: { message: 'Could not add pet'}
        end
    end

    def destroy
        pet_user = PetUser.find(params[:id])
        # pet_user.user = current_user
        pet_user.destroy

        redirect_to pet_users_path
    end

    private
    def pet_user_params
        params.require(:pet_user).permit(:name, :species, :breed, :age, :gender, :size, :photo, :description, :status, :contact, :user_id)
    end
end
