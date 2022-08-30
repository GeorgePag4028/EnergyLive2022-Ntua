## Auth microserice

### Usability  
RestApi:
 - [x] /auth/googlelogin 																	: renden login create user
 - [x] /auth/logout     																	: logout return to the login screen 
 - [x] /auth/updateuser?googleId=googleId&&days=days    	: update user lastExtention
	> http://localhost:5000/auth/updateuser?googleId=103966022100378281116&days=10
 - [x] /auth/getuser?googleId=googleId              			: return user data 
	> http://localhost:5000/auth/getuser?googleId=103966022100378281116


### Explain microservice 
#### Directory explained 
- public: css for the login in 
- view: handlebars(html) for the login page
- authenitcation: 
  - middleware: auth.js => ensureAuth, ensureGuest functions
  - models: User.js => user sequelize model
  - routes: 
    - auth.js: the api calls for the auth (can be found in usability) 
    - index.js: dashboard for the auth( not used in the application, was only for testing) 

#### Docker 
Creates a sql database. This database is used to store users.
docker compose -f sql.yml up -d
docker compose -f sql.yml down

#### NPM 
- Uses express to give the html page of login.
- Uses google-auth-passport20 to authenticate user with google
- Uses sequelize to communicate with database. 
- Uses url queries to transfer data from one port to the next


