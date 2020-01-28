# Requirements

- docker (at least 17.12.0+)
- docker-compose (at least 1.18.0)
- docker-hostmanager
- git

## Docker name resolution

In order to access the application on your browser, your host machine must be able to resolve the host name of your container.
We're using docker-etchosts to manage the hosts file entries. Check [GitHub](https://github.com/RegioHelden/docker-common) on how to set up our docker development environment.

# Setup

* Copy the repository content (please don't fork it so that there is no link to forked repositories someone might look up the solution at)
* Start the containers ```docker-compose up``` 
* Initialize the database ```docker-compose run django migrate```
* Create a Google OAuth client ID (https://developers.google.com/identity/sign-in/web/devconsole-project) and add http://testcase.rh-dev.eu:8001 to "Authorized JavaScript origins"
* Save the client ID in the Django settings file (backend/settings.py) to the variable GOOGLE_CLIENT_ID and use the same one in the frontend app
* Implement the frontend against the API
* Extend the readme on how to build and run the frontend, the JS frontend webserver should run on port 8001 (http://testcase.rh-dev.eu:8001)

# Frontend Setup 
* Open frontend folder ```cd frontend``` 
* Start frontend container ```docker-compose up``` 
* Navigate to (http://testcase.rh-dev.eu:8001) and sign in with your google account to access the secure user management page

# Authorization

The OAuth token generated on the client side must be sent with each request to the server in the Authorization header.

```Authorization: Token thisIsMyOAuthToken```

# API endpoints

The API provides GET, PUT, POST, PATCH, DELETE and OPTIONS to manage all user related needs

http://testcase.rh-dev.eu:8000/api/users to list and http://testcase.rh-dev.eu:8000/api/users/{id} to manage single users

# Contribute

## Requirements upgrades

Check for upgradeable packages by running 
```bash
docker-compose up -d
docker-compose exec django pip-check
```

## Making a new release

[bumpversion](https://github.com/peritus/bumpversion) is used to manage releases.

Add your changes to the [CHANGELOG](./CHANGELOG.rst), run
```bash
docker-compose exec django bumpversion <major|minor|patch>
```
then push (including tags).
