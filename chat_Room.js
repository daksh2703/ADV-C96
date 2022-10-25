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

function LOGOUT1() {
  window.location = "index.html";
  localStorage.removeItem("Username");
  localStorage.removeItem("roomname");
}

function ADDROOM() {
  room = document.getElementById("roomname").value;
  console.log(room);
  firebase.database().ref("/").child(room).update({
    room: "I have added room"
  });
  localStorage.setItem("roomname", room);
  window.location = "chat_page.html";
}

username = localStorage.getItem("Username");

document.getElementById("username").innerHTML = "Welcome " + username;

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirect(this.id)'>" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });
}
getData();

function redirect(Name) {
  localStorage.setItem("roomname", Name);
  window.location = "chat_page.html";
}
