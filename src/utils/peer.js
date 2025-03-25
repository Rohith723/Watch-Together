import Peer from "peerjs";

const peer = new Peer(undefined, {
  host: "0.peerjs.com", // Public PeerJS server
  port: 443,
  secure: true
});

peer.on("open", (id) => {
  console.log("Peer connected with ID:", id);
});

export default peer;
