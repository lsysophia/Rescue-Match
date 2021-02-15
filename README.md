## RESCUE-Match

## Description
This app was created to match users with rescue animals available in their area based on various criteria. 

Deployed at: https://sophia-li-rescue-match.herokuapp.com/ 

### App Screenshots
![1 - 1ESnPyn](https://user-images.githubusercontent.com/59341273/107974089-b13a9880-6f7b-11eb-8d46-4ee043b0bc4e.png)

![2 - 3xefBaL](https://user-images.githubusercontent.com/59341273/107974086-b0a20200-6f7b-11eb-9847-7af6ae89a99c.jpg)

## Schema:
<img width="725" alt="Screen Shot 2020-09-27 at 15 11 25" src="https://user-images.githubusercontent.com/59341273/107974219-df1fdd00-6f7b-11eb-8b87-10d80918c481.png">


## Wireframe:
<img width="1141" alt="Screen Shot 2021-02-15 at 10 53 14" src="https://user-images.githubusercontent.com/59341273/107974319-07a7d700-6f7c-11eb-8005-6877d560e673.png">


## User Stories
- Visitors need to create an account in order to use the application
- When creating user profile, zipcode is required as the API will search for available rescues within a certain range of the specific zipcode
- A match algorithm is ran when the user clicks "like" on an animal
- Only when it matches, will the animal be added to the list of saved animals in the user profile page
- User can unmatch an animal
- User can edit their account information

## HTTP Routes

Frontend:
- '/'
- '/about'
- '/register'
- '/login'
- '/logout'
- '/users/profile'
- '/user/edit'

Backend:
- '/home' index only
- '/login'
- '/logout'
- '/users'
- '/users/:id'
- '/profile'
- '/pet_users/:id'

## Technologies

- Ruby ver 2.6.6
- React
- PSQL
- Rails user auth
- Ruby Crono Gem (https://github.com/plashchynski/crono)
- Heroku autodeployment whenever latest revisions get pushed to Github

## API
- PetFinder API (https://www.petfinder.com/developers/v2/docs/)
The API needs user to request an access token that will expire every hour. The Ruby Crono gem was utilized in order to fetch the token automatically every 59 minutes.
- In the lib folder, pet_token_requester.rb uses ClientID and Client_Secret provided by Petfinder to request access token. ClientID and Secret is unique to each user.
- This file is then being used within app/jobs/get_api_token_job.rb as part of the Crono automation process.
- With the token, the home_controller.rb was then able to fetch data from the API

## Setup

- Fork the project or download it in your machine
- Create your database in psql
- Create database, run the migration files and create tables from db/migrations
- Create .env file on the root level
- Create a PetFinder account and request a ClientID and Secret from the provider
- In the .env file, add your own Client_ID and Client_Secret that you requested from PetFinder
- Make sure you have Ruby version 2.6.6 installed for this project
- First time running the project, please run bundle install
- To start the project locally, first start the rails server by running bundle exec rails s -p 3001
- Then cd into the client folder for React front-end and run yarn start
- You may access the jobs performed by Crono gem here: (https://sophia-li-rescue-match.herokuapp.com/crono/)


# Rescue-Match
