<template>
  <chat-window
    :current-user-id="currentUserId"
    :rooms="rooms"
    :messages="messages"
    :rooms-loaded="roomsLoaded"
    :loading-rooms="loadingRooms"
  />
</template>

<script>
import ChatWindow from "vue-advanced-chat";
import "vue-advanced-chat/dist/vue-advanced-chat.css";

export default {
  components: {
    ChatWindow,
  },
  data() {
    return {
      currentUserId: 1234,
      rooms: [
        {
          roomId: 1,
          roomName: "APPly",
          avatar: "https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj",
          unreadCount: 0,
          index: 3,
          lastMessage: {
            content: "Last message received",
            senderId: 1234,
            username: "John Doe",
            timestamp: "10:20",
            saved: true,
            distributed: false,
            seen: false,
            new: true,
          },
          users: [
            {
              _id: 1234,
              username: "John Doe",
              avatar: "https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj",
              status: {
                state: "online",
                lastChanged: "today, 14:30",
              },
            },
            {
              _id: 4321,
              username: "John Snow",
              avatar: "https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj",
              status: {
                state: "offline",
                lastChanged: "14 July, 20:00",
              },
            },
          ],
          typingUsers: [4321],
        },
      ],
      roomsLoaded: true,
      messagesLoaded: false,
      loadingRooms: false,
      messages: [],
    };
  },
  methods: {
    onFetchMessages() {
      setTimeout(() => {
        this.messages = [
          {
            _id: 7890,
            indexId: 12092,
            content: "Willkommen bei APPily",
            senderId: 1234,
            username: "John Doe",
            avatar: "https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj",
            date: "13 November",
            timestamp: "10:20",
            system: false,
            saved: true,
            distributed: true,
            seen: true,
            deleted: false,
            disableActions: false,
            disableReactions: false,
            replyMessage: {
              content: "Reply Message",
              senderId: 4321,
            },
          },
        ];
        this.messagesLoaded = true;
      });
    },
  },
};
</script>
