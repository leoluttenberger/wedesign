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
      @fetch-messages="onFetchMessages"
      @send-message="sendMessage"
    />
  </div>
</template>

<script setup lang="ts">
import ChatWindow from "vue-advanced-chat";
import "vue-advanced-chat/dist/vue-advanced-chat.css";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
const router = useRouter();
var avatarApply =
  "https://firebasestorage.googleapis.com/v0/b/wedesign-35121.appspot.com/o/We_Design_Logo_PNG.png?alt=media&token=e33bd9e0-153c-44a9-903c-e4c62d292f35";
var avatarUser1 = "https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj";

const name = ref("");
const email = ref("");
const currentUserId = ref(1234);
const rooms = ref([]);
const roomsLoaded = ref(true);
const messagesLoaded = ref(false);
const loadingRooms = ref(false);
const messages = ref([]);

onMounted(() => {
  if (localStorage.name) {
    name.value = localStorage.name;
  }
  if (localStorage.email) {
    email.value = localStorage.email;
  }
});
const onFetchMessages = () => {
  setTimeout(() => {
    messages.value = [
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
    messagesLoaded.value = true;
  });
};

const sendMessage = ({ content, roomId, files, replyMessage }) => {
  const message = {
    sender_id: currentUserId.value,
    content,
    timestamp: new Date(),
    files,
    replyMessage,
  };

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
  console.log(message);
  console.log(message.content);
  if (localStorage.name) {
    localStorage.setItem("email", JSON.stringify(message.content));
    console.log(JSON.parse(localStorage.getItem("email")));
  } else {
    localStorage.setItem("name", JSON.stringify(message.content));
    console.log(JSON.parse(localStorage.getItem("name")));
  }
  onFetchMessages();
};
</script>
