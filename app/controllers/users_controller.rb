class UsersController < ApiController
    before_action :require_login, except: [:create]

  def create
    user = User.create!(user_params)
    render json: { token: user.auth_token }
  end

  def show
    user = User.find_by!(auth_token: request.headers[:token])
    render json: {
        user: user
    }
  end

  def profile
    user = User.find_by!(auth_token: request.headers[:token])
    user_pets = PetUser.where(user_id: user.id)
    render json: {
        user: { user_id: user.id, username: user.username, email: user.email, name: user.name, zipcode: user.zipcode, has_cats: user.has_cats, has_dogs: user.has_dogs, has_child: user.has_child, has_yard: user.has_yard },
        pets: user_pets
    }
  end

  def update
    user = User.find_by!(auth_token: request.headers[:token])
    updated_user = user.update(user_params)

    render json: {
        user: updated_user
    }
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :name, :zipcode, :has_cats, :has_dogs, :has_child, :has_yard)
  end

end
