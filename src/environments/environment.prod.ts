export const environment = {
  production: true,
  apiUrl: 'https://algamoney-gti-api.herokuapp.com',

  tokenWhiteListedDomains: [ /algamoney-gti-api.herokuapp.com/ ],
  tokenBlackListedDomains: [ /\/oauth\/token/ ]
};
