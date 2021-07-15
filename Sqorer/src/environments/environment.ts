// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: 'AIzaSyCb683tLxi00DOKYfr0KavUCwAPYKTVrFY',
    authDomain: 'sqorer-fa9b5.firebaseapp.com',
    projectId: 'sqorer-fa9b5',
    storageBucket: 'sqorer-fa9b5.appspot.com',
    messagingSenderId: '346076957472',
    appId: '1:346076957472:web:76d1c408926cb864162545',
    measurementId: 'G-41JQXNFNRP'
  },
  //serverUrl: 'http://localhost:8082/api/' ,
  serverUrl: 'http://test-service.sqorer.com/api/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
