export const environment = {
  production: true,
  apiUrl: 'https://algamoney-gti-api.herokuapp.com',
    // apiUrl: 'http://localhost:8080',

    tokenWhiteListedDomains: [ new RegExp('algamoney-gti-api.herokuapp.com') ],
    tokenBlackListedDomains: [ new RegExp('\/oauth\/token') ]

//   tokenWhiteListedDomains: [ /algamoney-gti-api.herokuapp.com/ ],
//   tokenBlackListedDomains: [ /\/oauth\/token/ ]
};
