## RESCUE-Match

## Description
This app was created to match users with rescue animals that they may like.

### App Screenshots
https://imgur.com/a/ZQLejOK

## Schema:
https://imgur.com/a/gabmmpC


## Wireframe:
https://wireframe.cc/Rw7yMu


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
- You may access the jobs performed by Crono gem here: (https://sophia-li-rescue-match.herokuapp.com/crono/)


# Rescue-Match
