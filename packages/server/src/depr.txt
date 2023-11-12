export default function createSocketServer(httpServer: http.Server) {
  const socketServer = new SocketServer(httpServer);

  const clients: Record<string, User> = {};

  socketServer.on(SocketEventName.connection, (client) => {
    client.on(SocketEventName.signIn, (userInfo: User) => {
      const user_id = userInfo.id;
      const company_id = userInfo.companyId;

      if (!user_id || !company_id) return;

      client.myId = { id: user_id, companyId: userInfo.companyId };

      if (!clients[company_id]) {
        clients[company_id] = {};
      }

      if (clients[company_id][user_id]) {
        clients[company_id][user_id].push(client);
      } else {
        clients[company_id][user_id] = [client];
      }
      // Join default chatRoom
      const defaultRoomName = `channel${company_id}`;
      client.join(defaultRoomName);

      // Announce new user connected
      const onlineUserIdList = Object.keys(clients[company_id]);
      for (const user in clients[company_id]) {
        clients[company_id][user].forEach((clientSession: any) => {
          clientSession.emit(SocketEventName.onlineUsers, onlineUserIdList);
        });
      }
    });

    // client.on("error", (error: unknown) => console.log("ERROR!!", error));
    // client.on("disconnecting", (reason: string) => console.log("DISCONNECTING, ", reason));

    client.on(SocketEventName.channelBroadcast, (payload: any) => {
      // console.log('CHANNEL BROADCAST', io.sockets.adapter.rooms[payload.channelId]);
      // io.sockets.adapter.rooms[payload.channelId].length {to get how many in the room live}
      if (socketServer.sockets.adapter.rooms[payload.channelId]) {
        socketServer.to(payload.channelId).emit(SocketEventName.channelBroadcast, payload);
      }
    });

    client.on(SocketEventName.message, (msg: any) => {
      console.log("connections", Object.keys(clients));
      const targetId = msg.toId;
      const sourceId = client.myId.id;
      const { companyId } = client.myId;

      if (targetId && clients[companyId][targetId]) {
        clients[companyId][targetId].forEach((cli: any) => {
          cli.emit(SocketEventName.message, { ...msg, selfEcho: false });
        });
      }

      if (sourceId === targetId) {
        return;
      }

      if (sourceId && clients[companyId][sourceId]) {
        // Echo back
        clients[companyId][sourceId].forEach((cli: any) => {
          cli.emit(SocketEventName.message, { ...msg, selfEcho: true });
        });
      }
    });

    client.on(SocketEventName.disconnect, () => {
      if (!client.myId) {
        return;
      }

      const user_id = client.myId.id;
      const company_id = client.myId.companyId;

      // Leave chat rooms
      const defaultRoomName = `channel${company_id}`;
      client.leave(defaultRoomName);

      // Remove from clients object
      if (!clients[company_id] || !clients[company_id][user_id]) {
        return;
      }

      const targetClients = clients[company_id][user_id];

      for (let i = 0; i < targetClients.length; ++i) {
        if (targetClients[i] == client) {
          targetClients.splice(i, 1);
        }
      }

      if (targetClients.length === 0) {
        delete clients[company_id][user_id];
      }

      if (Object.keys(clients[company_id]).length === 0) {
        delete clients[company_id];
      }

      if (clients[company_id]) {
        // Announce new user connected
        const onlineUserIdList = Object.keys(clients[company_id]);
        for (const user in clients[company_id]) {
          clients[company_id][user].forEach((clientSession: any) => {
            clientSession.emit(SocketEventName.onlineUsers, onlineUserIdList);
          });
        }
      }
    });
  });
}
