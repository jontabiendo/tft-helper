# Generate:

npx sequelize model:generate --name "Name" --attributes "id:integer..."
npx sequelize seed:generate --name "Name"

# Migrate:

npx dotenv sequelize db:migrate
npx dotenv sequelize db:migrate:undo

# Seed:

npx dotenv sequelize db:seed:all
npx dotenv sequelize db:seed:undo:all