# CypressE2e

## This is my Cucumber-Allure expirience

Instructions for installation Allure plagin fo Cypress [here](https://github.com/Shelex/cypress-allure-plugin).

### Installation (using npm):

`npm i -D @shelex/cypress-allure-plugin`

### Setup:

add to cypress.config.js

```
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
cypress-allure-plugin/writer";

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on('file:preprocessor', webpackPreprocessor);
            allureWriter(on, config);
            return config;
        },
        env: {
            allure: true,
            allureReuseAfterSpec: true
        }
    }
});
```

Register commands in cypress/support/e2e.js file:

`import '@shelex/cypress-allure-plugin';`

### Scripts:

create allure report:

```
"allure:report": "allure generate allure-results --clean -o allure-report",
```

run tests & create report:

```
 "run:allure": "npm run cy:run & npm run allure:report"
```

open report in html:

```
"allure:open": "allure open allure-report"
```

clear report data:

```
"clear:allure": "rm -r allure-results/ allure-report cypress/screenshots || true",
```

#### If you have a problem (in powershell terminal) like this:

```
'allure' is not recognized as an internal or external command,
operable program or batch file.
```

use command:
`npm install allure-commandline --save-dev`

or use _bash_ terminal
