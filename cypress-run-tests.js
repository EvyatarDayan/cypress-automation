// e2e-run-tests.js
const cypress = require('cypress')

cypress.run({
        spec: './cypress/integration/tests/CICD/*.spec.js',
        // browser: 'chrome',
        config: {
            baseUrl: 'https://portal.apester.com',
            video: true,
        },
        env: {
            login_url: '/auth/login',
        },
    })

    .catch((err) => {
        console.error(err)
    })
