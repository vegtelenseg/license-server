Heroku Postgres
Follow these steps to deploy your Strapi app to Heroku using PostgreSQL:

# 1. Install the Heroku Postgres addon (opens new window)for using Postgres.

To make things even easier, Heroku provides a powerful addon system. In this section, you are going to use the Heroku Postgres addon, which provides a free "Hobby Dev" plan. If you plan to deploy your app in production, it is highly recommended switching to a paid plan.

Path: ./my-project/

    heroku addons:create heroku-postgresql:hobby-dev

# 2. Retrieve database credentials

The add-on automatically exposes the database credentials into a single environment variable accessible by your app. To retrieve it, type:

_Path: ./my-project/_

    heroku config

This should print something like this:

    DATABASE_URL: postgres://ebitxebvixeeqd:dc59b16dedb3a1eef84d4999sb4baf@ec2-50-37-231-192.compute-2.amazonaws.com: 5432/d516fp1u21ph7b.

(This url is read like so: _postgres:// USERNAME : PASSWORD @ HOST : PORT / DATABASE_NAME_)

# 3. Set Database variables automatically

Strapi expects a variable for each database connection configuration (host, username, etc.). So, from the url above, Strapi will deconstruct that environment variable using pg-connection-string (opens new window)package. Heroku will sometimes change the above url, so it's best to automate the deconstruction of it, as Heroku will automatically update the DATABASE_URL environment variable.

Install the package:

    yarn add pg-connection-string

# 4. Create your Heroku database config file for production

Create new subfolders in ./config like so: /env/production, then create a new database.js in it (see environment documentation). Your path should look like this: ./config/env/production/database.js. When you run locally you should be using the ./config/database.js which could be set to use SQLite, however it's recommended you use PostgreSQL locally also, for information on configuring your local database, please see the database documentation.

_Path: ./config/env/production/database.js_

const parse = require('pg-connection-string').parse;
const config = parse(process.env.DATABASE_URL);

    module.exports = ({ env }) => ({
      defaultConnection: "default",
        connections: {
          default: {
            connector: "bookshelf",
            settings: {
              client: "postgres",
              host: config.host,
              port: config.port,
              database: config.database,
              username: config.user,
              password: config.password,
            },
          },
        },
    });

You also need to set the `NODE_ENV` variable on Heroku to production to ensure this new database configuration file is used.

    heroku config:set NODE_ENV=production

# 5. Create your Strapi server config for production

Create a new server.js in a new env folder. In this file you only need one key, the url, to notify Strapi what our public Heroku domain is. All other settings will automatically be pulled from the default ./config/server.js.

_Path: ./config/env/production/server.js_

module.exports = ({ env }) => ({
url: env('SERVER_URL'),
});

You will also need to set the environment variable in Heroku for the MY_HEROKU_URL. This will populate the variable with something like https://your-app.herokuapp.com.

    heroku config:set server_url=$(heroku info -s | grep web_url | cut -d= -f2)
