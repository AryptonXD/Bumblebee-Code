const { ClusterManager, HeartbeatManager } = require('discord-hybrid-sharding');
const config = require("./src/config/config.json");
const { availableParallelism } = require('os');

const manager = new ClusterManager(`./src/index.js`, {
  totalShards: 'auto',
  shardsPerClusters: 4,
  totalClusters: availableParallelism(),
  respawn: true,
  mode: 'worker',
  token: config.token,
});

manager.extend(
  new HeartbeatManager({
    interval: 2000,
    maxMissedHeartbeats: 5,
  })
);

manager.on('clusterCreate', cluster => {
  console.log(`Launched cluster ${cluster.id}`);
  monitorCluster(cluster);
});

async function monitorCluster(cluster) {
  cluster.on('ready', () => console.log(`Cluster ${cluster.id} is ready`));
  cluster.on('disconnect', () => console.log(`Cluster ${cluster.id} disconnected`));
  cluster.on('reconnecting', () => console.log(`Cluster ${cluster.id} reconnecting`));
  cluster.on('death', process => {
    console.error(`Cluster ${cluster.id} died with exit code ${process.exitCode}, signal ${process.signalCode}`);
    restartCluster(cluster);
 });
}

async function restartCluster(cluster) {
  try {
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log(`Restarting cluster ${cluster.id}`);
    await cluster.respawn();
    console.log(`Cluster ${cluster.id} restarted`);
    monitorCluster(cluster);
  } catch (err) {
    console.error(`Failed to restart cluster ${cluster.id}: ${err}`);
    restartCluster(cluster);
  }
}

manager.spawn().catch(console.error);
