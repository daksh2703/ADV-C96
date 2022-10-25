const firebaseConfig = {
  apiKey: "AIzaSyADhBtTCLAXi_GqAn-ZJFW4qhijEaho3uM",
  authDomain: "school-chatapp-cfbf6.firebaseapp.com",
  databaseURL: "https://school-chatapp-cfbf6-default-rtdb.firebaseio.com",
  projectId: "school-chatapp-cfbf6",
  storageBucket: "school-chatapp-cfbf6.appspot.com",
  messagingSenderId: "924366453261",
  appId: "1:924366453261:web:b255e4c1348db40a997344"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("Username");
roomname = localStorage.getItem("roomname"); // earlier you had written 'room name' with space in between.
function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(roomname).push({
    Name: username,
    Message: msg,
    Like: 0
  });
  document.getElementById("msg").value = "";
}

function logout() {
  window.location = "index.html";
  localStorage.removeItem("Username");
  localStorage.removeItem("room name");
}

function getData() {
  firebase.database().ref("/" + roomname).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key; childData = childSnapshot.val();
      if (childKey != "room") { 
        firebase_message_id = childKey;
        message_data = childData;
        console.log(firebase_message_id);
        console.log(message_data);
        Name = message_data['Name'];
        Message = message_data['Message'];
        Like = message_data['Like'];
        Nametag = "<h4>" + Name + "<img class = 'user_tick' src='tick.png'> </h4>";
        Messagetag = "<h4 class = 'message_h4'>" + Message + "</h4>"; 
        Likes_button = "<button class = 'btn btn-success' id = " + firebase_message_id + " value = " + Like + " onclick = 'Updatelike(this.id)'>";
        Spantag = "<span class = 'glyphicon glyphicon-thumbs-up'> Like: " + Like + " </span></button><hr>";
        Row = Nametag + Messagetag + Likes_button + Spantag;
        document.getElementById("output").innerHTML += Row;
      }
    });
  });
}
getData();

function Updatelike(message_id) {
  Likes = document.getElementById(message_id).value;
  Updatedlikes = Number(Likes) + 1;
  firebase.database().ref(roomname).child(message_id).update({
    Like: Updatedlikes
  });
}