module.exports = {

// URLs
//----------------------------------------------------------------------------------------------------------------
    "prodUrls": {
        "login": "https://portal.apester.com/auth/login",
        "register": "https://portal.apester.com/auth/signup",
        "privacyPolicy": "https://apester.com/privacy-policy/",
        "termsOfService": "https://apester.com/terms-of-service/"
    },

    "stageUrls": {
        "login": "https://portal.automation.apester.dev/auth/login",
        "register": "https://portal.automation.apester.dev/auth/signup?",
        "privacyPolicy": "https://apester.com/privacy-policy/",
        "termsOfService": "https://apester.com/terms-of-service/"
    },

// Users
//----------------------------------------------------------------------------------------------------------------
    "prodUsers": {
        admin: {name: 'Evyatar', lastname: 'Dayan', email: 'evyatar.dayan@apester.com', password: 'Password1'},
        user1: {name: 'Tomato', lastname: 'One', email: 'tomato1@yopmail.com', password: 'Password1'},
        user2: {name: 'Tomato', lastname: 'Two', email: 'tomato2@yopmail.com', password: 'Password1'}

    },

    "stageUsers": {
        user1: {name: 'Tomato', lastname: 'One', email: 'tomato1@yopmail.com', password: 'Password1'},        // New user (after welcome wizard)
        user2: {name: 'Tomato', lastname: 'Two', email: 'tomato2@yopmail.com', password: 'Password1'}         // New user (welcome wizard)
    },

// Emails
//----------------------------------------------------------------------------------------------------------------
    "emailValid":
        ['abc-d@apester.com', 'abc.def@apester.com','abc@apester.com', 'abc_def@apester.com'],

    "emailInvalid":
        ['abc#def@apester.com', 'abc.def@apester.c', 'abc.def@apester#archive.com', 'abc.def@apester'],

// Passwords
//----------------------------------------------------------------------------------------------------------------
    "validPass":
        ['Password1', 'P@ssword2','pa$$Word3', 'Pa1234'],

    "invalidPass":
        ['password1', 'P@ssword','PASSWORD', 'password', 'Pass1'],

};
