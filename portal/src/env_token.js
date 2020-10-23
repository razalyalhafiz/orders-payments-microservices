(function (window) {
  window.__env = window.__env || {};

  window.__env.production = '${PRODUCTION}';
  window.__env.ordersURL = '${ORDERS_URL}';
  window.__env.apiKey = '${FIREBASE_API_KEY}';
  window.__env.authDomain = '${FIREBASE_AUTH_DOMAIN}';
  window.__env.databaseURL =  '${FIREBASE_DB_URL}';
  window.__env.projectId = '${FIREBASE_PROJECT_ID}';
  window.__env.storageBucket = '${FIREBASE_STORAGE_BUCKET}';
  window.__env.messagingSenderId = '${FIREBASE_MSG_SENDER_ID}';
  window.__env.appId = '${FIREBASE_APP_ID}';
  window.__env.measurementId = '${FIREBASE_MEASUREMENT_ID}';
})(this);
