<img src="https://raw.githubusercontent.com/hapijs/assets/master/images/hapi.png" width="200px" />

## HapiJs Backend Project Boilerplate Builder
### Visit the [hapi.dev](https://hapi.dev) Developer Portal for tutorials, documentation, and support

## Plugins included
- [Mongoose as ORM MongoDB](https://mongoosejs.com/docs/api.html)
- [Sequelize as ORM MySql](https://sequelize.org/master/)
- [Joi as validation request](https://joi.dev/api/)
- [Axios as service hitter](https://axios-http.com/docs/intro)
- [Winston as logging and debug](https://github.com/winstonjs/winston)

## Also installed useful code checker
- Eslint with standard style
- Husky pre-commit to check linter validation before committing code

## Useful resources
- [Documentation and API](https://hapi.dev/)
- [Version status](https://hapi.dev/resources/status/#hapi) (builds, dependencies, node versions, licenses, eol)
- [Changelog](https://hapi.dev/resources/changelog/)
- [Project policies](https://hapi.dev/policies/)
- [Free and commercial support options](https://hapi.dev/support/)

## Project Structure
This is recommended example of boilerplate project, you can change any name but be sure to check other file where have dependency to changed file
```
📦hapijs
┣ 📂controllers [all logic control stored here]
┃ ┣ 📂handlers [recommend using versioning of dir name so the api can have version]
┃ ┃ ┗ 📂v1 [make sure you create index.js inside this dir to indexing all route inside this dir]
┃ ┃ ┃ ┣ 📂handler [collection handler placed]
┃ ┃ ┃ ┗ 📂repositories [long queries doing based on inject workers]
┃ ┣ 📂services [if you want hit other service place hitter here]
┃ ┃ ┗ 📂test [service collection example]
┃ ┗ 📂workers [where query based orm stored here]
┣ 📂core [hapi root server and plugins configuration place]
┃ ┣ 📂utils [plugins for general utilization server]
┃ ┣ 📂db [plugins for manage db (sql and mongo)]
┃ ┗ 📂server [core root server and initiation plugins]
┣ 📂logging_data [logging from winston. all logger will store sequelize, request, response]
┣ 📂models [placed models for ORM]
┃ ┣ 📂mongoose [mongo models place here, with create dir name based on database name]
┃ ┃ ┗ 📂unicoop_test [recommend: placing by database name]
┃ ┗ 📂sequelize [sql based models place here, with create dir name based on database name]
┃ ┃ ┗ 📂warko_log [recommend: placing by database name]
┣ 📂utils [where utilization file placed like base config of axios, logger, standard response, etc]
┣ 📜.env.example [you can copy this file and rename to .env as environtment app]
┣ 📜.eslintrc.js [style linter js. you can change based your most known style]
┣ 📜test.js [testing app file]
┗ 📜index.js [this file is iniation file executor where you can place all indexed handlers here]
```

## Todo
- ~~Automate testing all demo service~~
- ~~Add documentation per directory~~
- ~~Add example mongoose~~
- ~~Add example hit service~~
- ~~Add example sequelize~~
- ~~Add .env.example~~
- ~~Add validator example~~
- ~~Add worker example~~
- Add redis memcache plugins
