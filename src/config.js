const dev = {
  API_ROOT: "http://localhost:3000/api/v1",
  WEBSOCKET_URL: "ws://localhost:3000/cable"
};

const prod = {
  API_ROOT: "http://142.93.131.30:3000/api/v1",
  WEBSOCKET_URL: "ws://142.93.131.30:3000/cable"
};

const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default config;
