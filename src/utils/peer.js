import Peer from "peerjs";

export const createPeer = () => {
  return new Peer({
    host: "localhost",
    port: 9000,  // Ensure your PeerJS server is running on this port
    path: "/peerjs",
    debug: 3,
  });
};
