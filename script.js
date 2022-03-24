const inp = document.getElementById("inp");
const btn = document.getElementById("btn");
const list = document.getElementById("list");
const para = document.getElementById("para");
// let elements;

btn.addEventListener("click", additem);
list.addEventListener("click", delcheck);
document.addEventListener("DOMContentLoaded", getfromlocal);

function additem(e) {
  e.preventDefault();

  if (inp.value == "") {
    alert("Please Write Something!");
    return;
  }

  const item = document.createElement("div");
  item.classList.add("items");

  const checkedbtn = document.createElement("INPUT");
  checkedbtn.setAttribute("type", "checkbox");
  checkedbtn.classList.add("checkbtn");
  item.appendChild(checkedbtn);

  const img = document.createElement("img");
  img.src = "pending_icon.svg";
  img.classList.add("imgbtn");
  item.appendChild(img);

  const iteminside = document.createElement("li");
  iteminside.classList.add("itemsinside");
  iteminside.innerText = inp.value;
  item.appendChild(iteminside);

  const delbtn = document.createElement("button");
  delbtn.innerHTML = '<i class="fas fa-trash"></i>';
  delbtn.classList.add("delebtn");
  item.appendChild(delbtn);

  //appending to ul
  list.appendChild(item);

  //Adding to the localstorage
  saveltolocal(inp.value);

  let p = document.getElementById('para');
  p.style.display = 'none';

  inp.value = "";
}

function search() {
  let filter = inp.value.toUpperCase().trim();
  let elements;
    if (localStorage.getItem("elements") === null) {
      elements = [];
    } else {
      // getting the elements saved in localStorage in array
      elements = JSON.parse(localStorage.getItem("elements"));
    }


    let arr = [];
    for(let i of elements){
      arr.push(i.text.toUpperCase());
    }

    let p = document.getElementById('para');

    if(arr.length != 0){
      if(arr.includes(filter)){
        p.innerText = "Task Already Exists!";
        p.style.display = 'block';
        btn.disabled = true;
        btn.style.opacity = "0.7";
      }
      else if(filter === ""){
        p.style.display = "none";
        btn.disabled = false;
        btn.style.opacity = "1";
      }
      else{
        p.innerText = "Task Not Found! Add A New One.";
        p.style.display = "block";
        btn.disabled = false;
        btn.style.opacity = "1";
      }
    }
    else{
      p.innerText = "No Tasks. Add A New One.";
      btn.disabled = false;
      p.style.display = "block";
    }
}

function delcheck(e) {
  // console.log(e);
  const clicked = e.target;
  // console.log(clicked);

  if (clicked.classList[0] === "delebtn") {
    const parent = clicked.parentElement;
    removefromlocal(parent);
    search();
    parent.remove();
  }
  // console.log(clicked.classList[0]);
  if (clicked.classList[0] === "checkbtn") {
    let elements;
    if (localStorage.getItem("elements") === null) {
      elements = [];
    } else {
      // getting the elements saved in localStorage in array
      elements = JSON.parse(localStorage.getItem("elements"));
    }
    // console.log(clicked.checked);
    const element = clicked.nextSibling;
    // console.log(element);
    if (clicked.checked == true) {
      clicked.nextSibling.nextSibling.classList.add("check");
      // clicked.nextSibling.innerText
      for (let i of elements) {
        //   console.log(i.text);
        if (i.text == clicked.nextSibling.nextSibling.innerText) {
          i.status = 1;
        }
      }
      clicked.nextSibling.src = "complete_icon.svg";
      localStorage.setItem("elements", JSON.stringify(elements));
    } else {
      clicked.nextSibling.nextSibling.classList.remove("check");
      for (let i of elements) {
        //   console.log(i.text);
        if (i.text == clicked.nextSibling.nextSibling.innerText) {
          i.status = 0;
        }
      }
      clicked.nextSibling.src = "pending_icon.svg";
      localStorage.setItem("elements", JSON.stringify(elements));
    }
  }
}

function saveltolocal(todo) {
  // console.log(typeof(todo));
  let elements;
  if (localStorage.getItem("elements") === null) {
    elements = [];
  } else {
    // getting the elements saved in localStorage in array
    elements = JSON.parse(localStorage.getItem("elements"));
  }

  let obj = {
    text: todo,
    status: 0,
  };
  elements.push(obj);

  localStorage.setItem("elements", JSON.stringify(elements));
}

function getfromlocal() {
  // console.log("Hello");
  let elements;
  if (localStorage.getItem("elements") === null) {
    elements = [];
  } else {
    // getting the elements saved in localStorage in array
    elements = JSON.parse(localStorage.getItem("elements"));
  }
  elements.forEach(function (todo) {
    // console.log(todo);
    const item = document.createElement("div");
    item.classList.add("items");

    const checkedbtn = document.createElement("INPUT");
    checkedbtn.setAttribute("type", "checkbox");
    checkedbtn.classList.add("checkbtn");
    item.appendChild(checkedbtn);
    if (todo.status == 1) {
      checkedbtn.checked = true;
    }

    const img = document.createElement("img");
    img.classList.add("imgbtn");
    item.appendChild(img);
    if (todo.status == 1) {
      img.src = "complete_icon.svg";
    } else {
      img.src = "pending_icon.svg";
    }

    let elements;
    if (localStorage.getItem("elements") === null) {
      elements = [];
    } else {
      // getting the elements saved from localStorage in array
      elements = JSON.parse(localStorage.getItem("elements"));
    }

    const iteminside = document.createElement("li");
    iteminside.classList.add("itemsinside");
    iteminside.innerText = todo.text;
    if (todo.status == 1) {
      iteminside.classList.add("check");
    }
    item.appendChild(iteminside);

    const delbtn = document.createElement("button");
    delbtn.innerHTML = '<i class="fas fa-trash"></i>';
    delbtn.classList.add("delebtn");
    item.appendChild(delbtn);

    list.appendChild(item);
  });
}

function removefromlocal(todo) {
  let elements, index;
  if (localStorage.getItem("elements") === null) {
    elements = [];
  } else {
    // getting the elements saved from localStorage in array
    elements = JSON.parse(localStorage.getItem("elements"));
  }
  //   console.log(todo);
  //   console.log(todo.childNodes[1].innerText);

  for (let i = 0; i < elements.length; i++) {
    //   console.log(elements[i]["text"]+ " "+ elements[i]["status"]);
    if (
      elements[i]["text"] == todo.childNodes[2].innerText &&
      elements[i]["status"] == todo.childNodes[0].checked
    ) {
      index = i;
      console.log(index);
    }
  }

  elements.splice(index, 1);
  localStorage.setItem("elements", JSON.stringify(elements));
}
