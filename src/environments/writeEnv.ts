const setEnv = () => {
  // Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';
  // Load node modules
  require('dotenv').config({
    path: '.env',
  });
  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
    production: false,
    firebase: {
      projectId: '${process.env["FB_PROJECT_ID"]}',
      appId: '${process.env["FB_APP_ID"]}',
      databaseURL: 'https://fir-403c4-default-rtdb.europe-west1.firebasedatabase.app',
      storageBucket: '${process.env["FB_STORAGE_BUCKET"]}',
      apiKey: '${process.env["FB_API_KEY"]}',
      authDomain: '${process.env['FB_AUTH_DOMAIN']}',
      messagingSenderId: '${process.env["FB_MESSAGGING_SENDER_ID"]}',
    },
};
`;

  require('fs').writeFile(targetPath, envConfigFile, (err: any) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.ts file generated correctly at ${targetPath} \n`
      );
    }
  });
};

setEnv();
