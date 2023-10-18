// async
// post data on endpoint
// show data
// get data from endpoint
// delete data from screen and endpoint
// update data on screen and enpoint


let form = document.getElementById('form').addEventListener('submit', addData)
window.addEventListener("DOMContentLoaded",getData)

// Taking input from user
async function addData(e) {
  e.preventDefault();

    let p_name = document.getElementById('name').value;
    let p_price = document.getElementById('price').value;
    let s_category = document.getElementById('select').value;

  let details = {
    p_name,
    p_price,
    s_category
  };

  try {
        const response = await axios.post("https://crudcrud.comSaeb773513659f7a021/callBookings", details);
    console.log(response.data);
    showonScreen(response.data);
  } catch (err) {
    console.log(err);
  }
}


// Showing data on screen
function showonScreen(user) {
    let flist = document.getElementById('flist');
    let clist = document.getElementById('clist');
  let elist = document.getElementById("elist");

  let child = `<li id="${user._id}">${user.p_name} ${user.p_price} ${user.s_category}
            <button class="delete-btn" onclick="deleteItemFromScreen('${user._id}')">delete</button>
            <button class="edit-btn" onclick="editUserItem('${user.p_name}','${user.p_price}','${user.s_category}','${user._id}')">edit</button>`;


  if (user.s_category === "Electronic") {
    flist.innerHTML += child;
        console.log(child)
    }

    else if (user.s_category === "Skin-Product") {

    clist.innerHTML += child;
    console.log(child);
    }
    else {
    elist.innerHTML += child;
    console.log(child);
  }
}

function showo(user) {
    let upd = document.getElementById("upd");
    console.log(user);
 
    let child = ` <button onclick="editUserItemFromBackend('${user}')">update</button>`;
       upd.innerHTML += child;
    console.log(child);
  }

// Get data from endpoint
async function getData() {
  try {
        const response = await axios.get("https://crudcrud.com/api/f2153126c4774aaeb773513659f7a021/callBookings");
    response.data.forEach((el) => {
      showonScreen(el);
    });
  } catch (error) {
    console.log(error);
  }
}

// delete data from screen
async function deleteItemFromScreen(userId) {
  let itemToRemove = document.getElementById(userId);
  itemToRemove.parentNode.removeChild(itemToRemove);
  try {
    await deleteDataFromBackend(userId);
  } catch (err) {
    console.log(err);
  }
}

async function editItemFromScreen(userId) {
  let itemToRemove = document.getElementById(userId);
  itemToRemove.parentNode.removeChild(itemToRemove);
  showo(userId)
}

// delete data from backend
async function deleteDataFromBackend(userId) {
  try {
        const res = await axios.delete(`https://crudcrud.com/api/f2153126c4774aaeb773513659f7a021/callBookings/${userId}`);
  } catch (err) {
    console.log(err);
  }
}

function editUserItem(name,price,category,userId){

  document.getElementById("name").value = name;
  document.getElementById("price").value = price;
  document.getAnimations("select").value = category;
  editItemFromScreen(userId);

}

async function editUserItemFromBackend(userId) {
    console.log("120 - hitting me..");
    let p_name = document.getElementById("name").value;
    let p_price = document.getElementById("price").value;
    let s_category = document.getElementById("select").value;
  
    let details = {
      p_name,
      p_price,
      s_category,
    };
    console.log("130details-", details);
    console.log(userId);

  try {
    const res = await axios.put(
      `https://crudcrud.com/api/f2153126c4774aaeb773513659f7a021/callBookings/${userId}`, 
      details
    );
    location.reload();
    console.log("125 :-", res);
  } catch (err) {
    console.log(err);
  }
}













