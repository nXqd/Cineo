const ipfsAPI = require("ipfs-api");

const ipfsFileEndpoint = "https://ipfs.infura.io/ipfs/";
const ipfsConnection = new ipfsAPI({ host: "ipfs.infura.io", port: 5001, protocol: "https" });
export { ipfsConnection, ipfsFileEndpoint };
