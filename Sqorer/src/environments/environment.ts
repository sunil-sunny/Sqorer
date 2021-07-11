// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: 'AIzaSyDMOetmzd1U6yFLFdeJmfeNmhAqV76lOrI',
    authDomain: 'sqorer-d8e20.firebaseapp.com',
    projectId: 'sqorer-d8e20',
    storageBucket: 'sqorer-d8e20.appspot.com',
    messagingSenderId: '354980587941',
    appId: '1:354980587941:web:b8a1074c63353629a1a04c',
    measurementId: 'G-ZD0ZH2RRE1'
  },
  serverUrl: 'http://localhost:8082/api/' ,
  //serverUrl: 'http://test-service.sqorer.com/api/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
