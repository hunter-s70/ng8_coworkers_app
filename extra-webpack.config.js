const webpack = require('webpack');

// define env variables
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        FBS_API_KEY: JSON.stringify(process.env.FBS_API_KEY),
        FBS_AUTH_DOMAIN: JSON.stringify(process.env.FBS_AUTH_DOMAIN),
        FBS_DB_URL: JSON.stringify(process.env.FBS_DB_URL),
        FBS_PROJECT_ID: JSON.stringify(process.env.FBS_PROJECT_ID),
        FBS_STORAGE_BUCKET: JSON.stringify(process.env.FBS_STORAGE_BUCKET),
        FBS_MES_SENDER_ID: JSON.stringify(process.env.FBS_MES_SENDER_ID),
        FBS_APP_ID: JSON.stringify(process.env.FBS_APP_ID)
      }
    })
  ]
};
