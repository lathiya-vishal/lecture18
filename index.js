const dbtn = async (id) => {
  fetch(`http://localhost:3000/student/${id}`, {
    method: "DELETE",
  });
};

let id = -1;

const display = (data) => {
  document.getElementById("ui").innerHTML = "";
  data.map((ele) => {
    let name = document.createElement("h1");
    name.innerHTML = ele.username;

    let email=document.createElement("h2");
    email.innerHTML=ele.email;

    let password = document.createElement("h3");
    password.innerHTML = ele.password;

    let btn = document.createElement("button");
    btn.innerHTML = "Delete";
    btn.addEventListener("click", () => {
      dbtn(ele.id);
    });

    let btn1=document.createElement("button");
    btn1.innerHTML="update";

    btn1.addEventListener("click",()=>{
      document.getElementById("username").value = ele.username;
      document.getElementById("email").value = ele.email;
      document.getElementById("password").value = ele.password;
      document.getElementById("value").value = "update";
      id = ele.id;
    });
    
    let div = document.createElement("div");
    div.append(name,email, password,btn,btn1);
    document.getElementById("ui").append(div);
  });
  console.log(data);
};

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let type = document.getElementById("value").value;
  let user = {
    username: document.getElementById("username").value,
    email:document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  console.log(user);

  if (type == "submit") {
    fetch("http://localhost:3000/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
      .then((res) => res.json())
      .then((data) => console.log(data));
  } else {
    fetch(`http://localhost:3000/student/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("value").value = "update";


  }
});

fetch("http://localhost:3000/student",{})
  .then((res) => res.json())
  .then((data) => display(data));
