<template>
  <div>
    <chat-window
      :height="'calc(100vh - 80px)'"
      :current-user-id="currentUserId"
      :rooms="rooms"
      :rooms-loaded="roomsLoaded"
      :loading-rooms="loadingRooms"
      :messages="messages"
      :messages-loaded="messagesLoaded"
      :room-actions="roomActions"
      :menu-actions="menuActions"
      :message-selection-actions="messageSelectionActions"
      :room-message="roomMessage"
      :templates-text="templatesText"
      :textarea-action-handler="textareaActionHandler"
      @fetch-messages="onFetchMessages"
      @send-message="sendMessage"
    />
  </div>
</template>

<script>
import ChatWindow from "vue-advanced-chat";
import "vue-advanced-chat/dist/vue-advanced-chat.css";
import { useRouter } from "vue-router";
const router = useRouter();
var avatarApply =
  "https://firebasestorage.googleapis.com/v0/b/wedesign-35121.appspot.com/o/We_Design_Logo_PNG.png?alt=media&token=e33bd9e0-153c-44a9-903c-e4c62d292f35";
var avatarUser1 = "https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj";
export default {
  components: {
    ChatWindow,
  },
  data() {
    return {
      name: "",
      email: "",
      currentUserId: 1234,
      rooms: [
        {
          roomId: 1,
          roomName: "Willkommen!",
          avatar: avatarApply,
          unreadCount: 0,
          index: 3,
          lastMessage: {
            content: "Ausständig",
            senderId: 1234,
            username: "APPly",
            timestamp: "10:20",
            saved: true,
            distributed: false,
            seen: false,
            new: true,
          },
          users: [
            {
              _id: 1234,
              username: "APPly",
              avatar: avatarApply,
              status: {
                state: "online",
                lastChanged: "today, 14:30",
              },
            },
            {
              _id: 4321,
              username: "User 1",
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
  mounted() {
    if (localStorage.name) {
      this.name = localStorage.name;
    }
    if (localStorage.email) {
      this.email = localStorage.email;
    }
  },
  methods: {
    onFetchMessages() {
      setTimeout(() => {
        this.messages = [
          {
            _id: 1,
            indexId: 1,
            content: "Willkommen bei APPly!",
            senderId: 1234,
            username: "APPly",
            avatar: avatarApply,
            date: "13 November",
            timestamp: "10:20",
            system: false,
            saved: true,
            distributed: true,
            seen: true,
            deleted: false,
            disableActions: true,
            disableReactions: true,
          },
          {
            _id: 2,
            indexId: 2,
            content:
              "Diese App kann dir helfen, Bewerbungen am Handy zu erstellen und zu verwalten. Zu Beginn möchte ich dafür kurz um ein paar Infos zu dir selbst bitten.",
            senderId: 1234,
            username: "APPly",
            avatar: avatarApply,
            date: "13 November",
            timestamp: "10:20",
            system: false,
            saved: true,
            distributed: true,
            seen: true,
            deleted: false,
            disableActions: true,
            disableReactions: true,
          },
          {
            _id: 3,
            indexId: 3,
            content:
              "Wie lautedt dein vollständiger Name? (dieser wird später so auf deinenen Bewerbungen aufscheinen.)",
            senderId: 1234,
            username: "APPly",
            avatar: avatarApply,
            date: "13 November",
            timestamp: "10:20",
            system: false,
            saved: true,
            distributed: true,
            seen: true,
            deleted: false,
            disableActions: true,
            disableReactions: true,
          },
          {
            _id: 4,
            indexId: 4,
            content: JSON.parse(localStorage.getItem("name")),
            senderId: 4321,
            username: "User 1",
            avatar: avatarUser1,
            date: "13 November",
            timestamp: "10:20",
            system: false,
            saved: true,
            distributed: true,
            seen: true,
            deleted: false,
            disableActions: true,
            disableReactions: true,
          },
          {
            _id: 5,
            indexId: 5,
            content:
              "Danke! Welche E-Mail Adresse möchtest du für deine Bewerbung nutzen?",
            senderId: 1234,
            username: "APPly",
            avatar: avatarApply,
            date: "13 November",
            timestamp: "10:20",
            system: false,
            saved: true,
            distributed: true,
            seen: true,
            deleted: false,
            disableActions: true,
            disableReactions: true,
          },
          {
            _id: 6,
            indexId: 6,
            content: JSON.parse(localStorage.getItem("email")),
            senderId: 4321,
            username: "User 1",
            avatar: avatarUser1,
            date: "13 November",
            timestamp: "10:20",
            system: false,
            saved: true,
            distributed: true,
            seen: true,
            deleted: false,
            disableActions: true,
            disableReactions: true,
          },
          {
            _id: 7,
            indexId: 7,
            content:
              "Alles klar! Bevor es losgeht möchtest du noch die Daten für deinen Lebenslauf eingeben? (das kannst du jederzeit im Menü nachholen)",
            senderId: 1234,
            username: "APPly",
            avatar: avatarApply,
            date: "13 November",
            timestamp: "10:20",
            system: false,
            saved: true,
            distributed: true,
            seen: true,
            deleted: false,
            disableActions: true,
            disableReactions: true,
          },
          {
            _id: 8,
            indexId: 8,
            content: "Ja",
            senderId: 1234,
            username: "APPly",
            avatar: avatarApply,
            date: "13 November",
            timestamp: "10:20",
            system: false,
            saved: true,
            distributed: true,
            seen: true,
            deleted: false,
            disableActions: true,
            disableReactions: true,
          },
        ];
        this.messagesLoaded = true;
      });
    },
    async sendMessage({ content, roomId, files, replyMessage }) {
      const message = {
        sender_id: this.currentUserId,
        content,
        timestamp: new Date(),
      };

      if (files) {
        message.files = this.formattedFiles(files);
      }

      if (replyMessage) {
        message.replyMessage = {
          _id: replyMessage._id,
          content: replyMessage.content,
          sender_id: replyMessage.senderId,
        };

        if (replyMessage.files) {
          message.replyMessage.files = replyMessage.files;
        }
      }
      //const { id } = await firestoreService.addMessage(roomId, message);
      const { id } = 1;
      console.log(message);
      console.log(message.content);
      if (localStorage.name) {
        localStorage.setItem("email", JSON.stringify(message.content));
        console.log(JSON.parse(localStorage.getItem("email")));
      } else {
        localStorage.setItem("name", JSON.stringify(message.content));
        console.log(JSON.parse(localStorage.getItem("name")));
      }
      this.onFetchMessages();
      if (files) {
        for (let index = 0; index < files.length; index++) {
          await this.uploadFile({ file: files[index], messageId: id, roomId });
        }
      }

      //firestoreService.updateRoom(roomId, { lastUpdated: new Date() });
    },
  },
};
</script>
