export const environment = {
  production: true,
  apiUrl: 'https://algamoney-gti-api.herokuapp.com',
    // apiUrl: 'http://localhost:8080',

  tokenWhiteListedDomains: [ /algamoney-gti-api.herokuapp.com/ ],
  tokenBlackListedDomains: [ /\/oauth\/token/ ]
};
