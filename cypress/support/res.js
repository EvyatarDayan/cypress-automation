module.exports = {

  // URLs
  //----------------------------------------------------------------------------------------------------------------
  prodUrls: {
    login: 'https://portal.apester.com/auth/login',
    register: 'https://portal.apester.com/auth/signup',
    privacyPolicy: 'https://apester.com/privacy-policy/',
    termsOfService: 'https://apester.com/terms-of-service/',
    aniview: 'https://manage.aniview.com/login?redirectTo=%2F&accessRedirect=true'
  },

  automationUrls: {
    login: 'https://portal.automation.apester.dev/auth/login',
    register: 'https://portal.automation.apester.dev/auth/signup',
    privacyPolicy: 'https://apester.com/privacy-policy/',
    termsOfService: 'https://apester.com/terms-of-service/',
    dynamicTestPages: 'https://dynamictestpages.dev-cluster.apester.dev/index.html'
  },

  stagingUrls: {
    login: 'https://portal.stg.apester.dev/auth/login',
    register: 'https://portal.stg.apester.dev/auth/signup',
  },

  // Users
  //----------------------------------------------------------------------------------------------------------------
  prodUsers: {
    admin: { name: 'Evyatar', lastname: 'Dayan', email: 'evyatar.dayan@apester.com', password: 'Password1' },
    superAdmin: { name: 'Admin', lastname: 'Apester', email: 'test+goldstar-best-beer-ever-123456789000@apester.com', password: 'Password1' },
    user1: { name: 'Tomato', lastname: 'One', email: 'tomato1@yopmail.com', password: 'Password1' },
    user2: { name: 'Tomato', lastname: 'Two', email: 'tomato2@yopmail.com', password: 'Password1' },
    aniview: { name: 'Aniview', lastname: 'None', email: 'evyatar.dayan@apester.com', password: '3PDg36MgVN9eD6R' }
  },

  automationUsers: {
    admin1: { name: 'Admin', lastname: 'One', email: 'admin1@yopmail.com', password: 'Password1' },
    user1: { name: 'Tomato', lastname: 'One', email: 'tomato1@yopmail.com', password: 'Password1' },
    user2: { name: 'Tomato', lastname: 'Two', email: 'tomato2@yopmail.com', password: 'Password1' },
    user3: { name: 'Tomato', lastname: 'Three', email: 'tomato3@yopmail.com', password: 'Password1' },
    user4: { name: 'Tomato', lastname: 'Four', email: 'tomato4@yopmail.com', password: 'Password1' },

    user10: { name: 'Orange', lastname: 'One', email: 'orange1@yopmail.com', password: 'Password1' },
    user11: { name: 'Orange', lastname: 'Two', email: 'orange2@yopmail.com', password: 'Password1' },
  },

  // Emails
  //----------------------------------------------------------------------------------------------------------------
  emailValid:
        ['abc-d@apester.com', 'abc.def@apester.com', 'abc@apester.com', 'abc_def@apester.com'],

  emailInvalid:
        ['abc#def@apester.com', 'abc.def@apester.c', 'abc.def@apester#archive.com', 'abc.def@apester'],

  // Passwords
  //----------------------------------------------------------------------------------------------------------------
  validPass:
        ['Password1', 'P@ssword2', 'pa$$Word3', 'Pa1234'],

  invalidPass:
        ['password1', 'P@ssword', 'PASSWORD', 'password', 'Pass1'],

  // Number of people
  //----------------------------------------------------------------------------------------------------------------
  numberOfPeople:
        ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],

};
