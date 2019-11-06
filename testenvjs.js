require('dotenv').config()
const getEnv = env => {
  const value = process.env[env];  if (typeof value === 'undefined') {
    throw new Error(`${env} has not been set.`);
  }  return value;
};
const liveNetworkId = getEnv('ETH_LIVE_NETWORK_ID');
const infuraKey = getEnv('INFURA_MAINNET_KEY');
console.log(liveNetworkId)
console.log(infuraKey)