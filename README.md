# Deploy an application to Heroku

### Steps

1. Clone the repo and create a new branch
```
git clone https://github.com/jamiesonbates/heroku-hello-world
cd heroku-hello-world
npm install
git checkout -b heroku
```
*NOTE:* you should be in the project directory when deploying to Heroku.

2. Create a "Heroku app" (replace USERNAME with your name)
```
heroku apps:create USERNAME-heroku-hello-world
```

*NOTE:* if you do not have a Heroku account, create one. If you have never deployed to Heroku from the command line before, you may have to sign in with your Heroku credentials.

3. Inspect properties in your new Heroku production environment!
```
heroku apps:info
```

*NOTE:* you should see information about the app you just created, including the name you gave.

4. Set the version of Node you want Heroku to run.
Find out which version you were using when developing the app:
```
node -v
```
Add the following code to your package.json file. Place the version number where 'DEV_VERSION' is currently:
```json
"engines": {
  "NODE": "_DEV_VERSION_"
}
```

*NOTE:* This piece of configuration will tell Heroku what version of Node you want to run. 

5. Add 'postgresql' to your Heroku production environment.
Add:
```
heroku addons:create heroku-postgresql
```
View information about the database you just created.
```
heroku pg:info
```

6. Specify the connection URL to the production database within `knexfile.js`.
```javascript
production: {
  client: 'pg',
  connection: process.env.DATABASE_URL
}
```

7. Add a script in `package.json` so that Heroku automatically migrates your database.
```json
"scripts": {
  "knex": "knex",
  "heroku-postbuild": "knex migrate:latest"
}
```

8. Add a Procfile, which Heroku will use to start your server in the production environment.
```
echo 'web: node index.js' > Procfile
```
*NOTE:* `index.js` is the file which contains your express server.

9. Test that everything works with `forman`, which works similarly to Heroku.
Install foreman.
```
npm install --save-dev foreman
```

Update the scripts section of your `package.json` file so that it looks as follows:
```json
"scripts": {
  "knex": "knex",
  "heroku-postbuild": "knex migrate:latest",
  "nf": "nf start",
  "nodemon": "nodemon index.js"
},
```

Start your server locally with foreman
```
npm run nf
```
*NOTE:* if your server does not show any errors, you should be good to go!

10. Generate a secret `JWT_KEY` in your production environment.
```
bash -c 'heroku config:set JWT_KEY=$(openssl rand -hex 64)'
```

11. Add, commit, and _push to heroku_
```
git add .
git commit -m 'Prepare the heroku!'
git checkout master
git merge heroku
git br -d heroku
git push heroku master
```
*NOTE:* git will only push changes that have been committed.

12. Inspect the production environment again and seed your database.
Inspect the results of the following:
```
heroku apps:info
heroku pg:info
```
Login to the production database and verify that your migrations and seeds have run properly
```
heroku pg:psql

`SELECT * FROM cities`
```

*NOTE:* you won't see a list of cities as results.

Seed your database:
```
heroku run knex seed:run 
```

Print your server logs (what is happening in the server):
```
heroku logs
```

Send an httpie request to GET cities
```
http GET <INSERT NAME OF APP HERE>.herokuapp.com
```
