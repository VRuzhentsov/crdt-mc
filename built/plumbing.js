import Pusher from 'pusher-js';
import {default as PusherNotifier} from 'pusher';
import os from "os";

const channelName = 'CRDT-MC';
const eventCommand = 'COMMAND';
const eventState = 'STATE';

const pusherConfig = {
  appId: '606218',
  key: 'b26e29b3d8076308baff',
  secret: 'c2e05f8887c217e2cdd2',
  cluster: 'eu',
  encrypted: true
};

Pusher.log = (msg) => {
  console.log(msg);
};

export const downstreamFactory = new Pusher(pusherConfig.key, pusherConfig);

export const upstream = new PusherNotifier(pusherConfig)
export const downstream = downstreamFactory.subscribe(channelName);

// basically API to our transport
export const syncCommand = (payload) => upstream.trigger(channelName, eventCommand, payload);
export const syncState = (payload) => upstream.trigger(channelName, eventState, payload);
export const listenCommand = (fn) => downstream.bind(eventCommand, fn);

export function findIp () {
  let ifaces = os.networkInterfaces();
  for (var ifname in ifaces) {
    let iface = ifaces[ifname];
    for (var i = 0; i < iface.length; i++) {
      if ('IPv4' === iface[i].family && iface[i].internal === false)
        return [ifname, iface[i].address];
    }
  }
}