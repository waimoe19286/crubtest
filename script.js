// const fetchUser = async () => {
//   const response = await fetch("http://localhost:3000/users");
//   const users = await response.json();
//   console.log(users);
// };
// fetchUser();
const getSystem = async () => {
  const response = await fetch("http://localhost:3000/users", {
    method: "GET",
  });
  const dataFromServer = await response.json();
  const mainDiv = document.querySelector(".waimoe");
  for (let i = 0; i < dataFromServer.length; i++) {
    const userDiv = document.createElement("tr");
    userDiv.innerHTML = `
    <td class="py-3">${dataFromServer[i].name}
    </td><td class="py-3">${dataFromServer[i].email}</td>
    <td><button class="btn btn-info text-danger">Edit</button><button class="btn btn-danger ${dataFromServer[i].name} text-white mx-3">Delete</button></td>
    `;
    mainDiv.append(userDiv);
  }
};
getSystem();
const btnDiv = document.querySelector(".buttondiv");
const nameDiv = document.querySelector(".name");
const emailDiv = document.querySelector(".email");
const passwordDiv = document.querySelector(".password");

const register = async () => {
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify({ name: nameDiv.value, email: emailDiv.value }),
  });
};

btnDiv.addEventListener("click", register);

//file upload
const fileuploadFun = async () => {
  const fileValue = document.querySelector(".fileupload");
  const response = await fetch("http://localhost:3000/fileupload", {
    method: "POST",
    body: fileValue.files[0],
  });
  console.log(await response.json());
};
