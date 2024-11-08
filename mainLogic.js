let isLogedInBtn = () => {
  const sureTokenFind = localStorage.getItem("token");
  let boxOfAddPost = document.getElementById(`boxOfAddPost`);
  if (sureTokenFind == null) {
    document.getElementById(`boxProfileInfo`).style.display = "none";
    document.getElementById(`btn-nav-login`).style.display = "flex";
    document.getElementById(`nav-link`).style.visibility = "hidden";
    if (boxOfAddPost != null) {
      document.getElementById(`boxOfAddPost`).style.display = "none";
    }
  } else {
    document.getElementById(`btn-nav-login`).style.display = "none";
    document.getElementById(`boxProfileInfo`).style.display = "flex";
    document.getElementById(`nav-link`).style.visibility = "visible";
    if (boxOfAddPost != null) {
      document.getElementById(`boxOfAddPost`).style.display = "block";
    }
    document.getElementById(`profileinfo`).innerHTML = `
      <img class="img-header-post" src="${virtualProfile_image(
        JSON.parse(localStorage.getItem("user")).profile_image
      )}">
      <span class="username">${
        JSON.parse(localStorage.getItem("user")).username
      }</span>
      `;
  }
};

let toggleLoader = (itsTrue) => {
  if (itsTrue) {
    document.getElementById(`box-of-loade`).style.visibility = "visible";
  } else {
    document.getElementById(`box-of-loade`).style.visibility = "hidden";
  }
};

let postClicked = (Id) => {
  window.location = `./postDetails.html?postId=${Id}`;
};

let currentUser = (user) => {
  user = JSON.parse(localStorage.getItem("user"));
  if (user != null) {
    return user;
  } else {
    return ``;
  }
};

let virtualProfile_image = (pictureapi) => {
  let type = typeof pictureapi;
  if (type == "string") {
    return pictureapi;
  } else {
    return "./img/Post/header/skills-01.jpg";
  }
};

let findBodyImage = (pictureapi) => {
  let type = typeof pictureapi;
  if (type == "string") {
    return pictureapi;
  } else {
    return "";
  }
};

let getTags = (tagApi) => {
  axios.get(`https://tarmeezacademy.com/api/v1/posts/${tagApi}`).then((res) => {
    const numberTags = res.data.data.tags.length;
    let tags = ``;
    for (let i = 0; i < numberTags; i++) {
      tags += `<span class="tag" id="tag" style="  margin-right: 5px;
      background-color: gray;
      color: wheat;
      padding: 4px;
      border-radius: 10px;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      -ms-border-radius: 10px;
      -o-border-radius: 10px;">${res.data.data.tags[i].name}</span>`;
    }
    document.getElementById(`tags_${tagApi}`).innerHTML = tags;
  });
};

document.getElementById(`logout`).addEventListener("click", () => {
  localStorage.clear();
  isLogedInBtn();
  const urlparam = new URLSearchParams(window.location.search);
  const id = urlparam.get("postId");
  let Sure = urlparam.get("Sure");
  let authorId = urlparam.get("authorId");
  if (id != null) {
    postClickedShowComments();
  } else if (authorId != null || Sure == 1) {
    profileCardInfo();
    getUserPosts();
  } else {
    currentPage = 1;
    reloaad = true;
    getPosts();
  }
  showAlert("I am so sad, you logged out", "danger");
  // todo
  // const alertHide = new bootstrap.Alert(`#logout-alert`);
  // setTimeout(() => {
  //   alertHide.close();
  // }, 5000);
});

document.getElementById(`register`).addEventListener("click", () => {
  let UserName = document.getElementById(`username-register`).value;
  let PassWoord = document.getElementById(`password-register`).value;
  let Name = document.getElementById(`name`).value;
  let profile__image = document.getElementById(`profileImage`).files[0];
  let formdata = new FormData();
  formdata.append("username", UserName);
  formdata.append("password", PassWoord);
  formdata.append("image", profile__image);
  formdata.append("name", Name);
  toggleLoader(true);
  axios
    .post("https://tarmeezacademy.com/api/v1/register", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      const modal = bootstrap.Modal.getInstance(
        document.getElementById(`exampleModalRegister`)
      );
      modal.hide();
      isLogedInBtn();
      const urlparam = new URLSearchParams(window.location.search);
      const id = urlparam.get("postId");
      let Sure = urlparam.get("Sure");
      let authorId = urlparam.get("authorId");
      if (id != null) {
        postClickedShowComments();
      } else if (authorId != null || Sure == 1) {
        profileCardInfo();
        getUserPosts();
      } else {
        currentPage = 1;
        reloaad = true;
        getPosts();
      }
      showAlert("New User Registered Successfully", "success");
    })
    .catch((error) => {
      const modal = bootstrap.Modal.getInstance(
        document.getElementById(`exampleModalRegister`)
      );
      modal.hide();
      showAlert(error.response.data.message, "danger");
    })
    .finally(() => {
      toggleLoader(false);
    });
});

document.getElementById(`login`).addEventListener("click", () => {
  let userName = document.getElementById(`username`).value;
  let passWoord = document.getElementById(`password`).value;
  const bodyparam = {
    username: userName,
    password: passWoord,
  };
  toggleLoader(true);
  axios
    .post("https://tarmeezacademy.com/api/v1/login", bodyparam)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      const modal = bootstrap.Modal.getInstance(
        document.getElementById(`exampleModal`)
      );
      modal.hide();
      isLogedInBtn();
      const urlparam = new URLSearchParams(window.location.search);
      const id = urlparam.get("postId");
      let Sure = urlparam.get("Sure");
      let authorId = urlparam.get("authorId");
      if (id != null) {
        postClickedShowComments();
      } else if (authorId != null || Sure == 1) {
        profileCardInfo();
        getUserPosts();
      } else {
        currentPage = 1;
        reloaad = true;
        getPosts();
      }
      showAlert("Nice, you logged in successfully", "success");
      // todo
      // const alertHide = new bootstrap.Alert(`#login-alert`);
      // setTimeout(() => {
      //   alertHide.close();
      // }, 5000);
    })
    .catch((error) => {
      const modal = bootstrap.Modal.getInstance(
        document.getElementById(`exampleModal`)
      );
      modal.hide();
      showAlert(error.response.data.message, "danger");
    })
    .finally(() => {
      toggleLoader(false);
    });
});

let updatePost = (updateId) => {
  const sureTokenFind = localStorage.getItem("token");
  if (sureTokenFind != null) {
    let iD = JSON.parse(localStorage.getItem("user")).id;
    if (updateId == iD) {
      return `
      <button type="button" id="updatePost" class="btn btn-secondary">Edit Post</button>
      `;
    } else {
      return ``;
    }
  } else {
    return ``;
  }
};

let deletePost = (updateId, Id) => {
  const sureTokenFind = localStorage.getItem("token");
  if (sureTokenFind != null) {
    let iD = JSON.parse(localStorage.getItem("user")).id;
    if (updateId == iD) {
      return `
        <button type="button" id="deletePost" value="${Id}" class="btn btn-danger" onclick="deletePostModalWarning(this)">Delete Post</button>
      `;
    } else {
      return ``;
    }
  } else {
    return ``;
  }
};

let postDeleteId;

let deletePostModalWarning = (btnDelete) => {
  let postModal = new bootstrap.Modal(
    document.getElementById(`deletePostModalWarning`),
    {}
  );
  postModal.toggle();
  postDeleteId = btnDelete.value;
};

let deletePostEvent = () => {
  let token = localStorage.getItem("token");
  let headers = {
    Authorization: `Bearer ${token}`,
  };
  axios
    .delete(`https://tarmeezacademy.com/api/v1/posts/${postDeleteId}`, {
      headers: headers,
    })
    .then((res) => {
      const modal = bootstrap.Modal.getInstance(
        document.getElementById(`deletePostModalWarning`)
      );
      modal.hide();
      showAlert("Your Post Has Been Deleted", "success");
      const urlparam = new URLSearchParams(window.location.search);
      const id = urlparam.get("postId");
      let Sure = urlparam.get("Sure");
      let authorId = urlparam.get("authorId");
      if (id != null) {
        postClickedShowComments();
      } else if (authorId != null || Sure == 1) {
        profileCardInfo();
        getUserPosts();
      } else {
        let currentPage = 1;
        let reloaad = true;
        getPosts();
      }
    })
    .catch((error) => {
      console.log(error);
      const modal = bootstrap.Modal.getInstance(
        document.getElementById(`deletePostModalWarning`)
      );
      modal.hide();
      showAlert(error.response.data.error_message, "danger");
    });
};

let sureAddPostOrUpdatePostBtnClicked = false;
let idOfPostEdit;

let updatePostInfo = (post) => {
  sureAddPostOrUpdatePostBtnClicked = true;
  obj = JSON.parse(decodeURIComponent(post));
  document.getElementById(
    `exampleModalLabelEditPost`
  ).innerHTML = `Edit Your Post`;
  document.getElementById(`post`).innerHTML = `Edit`;
  document.getElementById(`titlePost`).value = obj.title;
  document.getElementById(`bodyAddPost`).value = obj.body;
  idOfPostEdit = obj.id;
  let postModal = new bootstrap.Modal(
    document.getElementById(`exampleModalAddPost`),
    {}
  );
  postModal.toggle();
};

document.getElementById(`post`).addEventListener("click", () => {
  let title = document.getElementById(`titlePost`).value;
  let bodyAddPost = document.getElementById(`bodyAddPost`).value;
  let image = document.getElementById(`profileImageAddPost`).files[0];
  let token = localStorage.getItem("token");
  let formData = new FormData();
  formData.append("title", title);
  formData.append("body", bodyAddPost);
  formData.append("image", image);
  let headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };
  let url;
  let messageNote;
  if (!sureAddPostOrUpdatePostBtnClicked) {
    url = `https://tarmeezacademy.com/api/v1/posts`;
    messageNote = "Your Post Has Been Published";
  } else {
    formData.append("_method", "put");
    url = `https://tarmeezacademy.com/api/v1/posts/${idOfPostEdit}`;
    messageNote = "Your Post Has Been Edited";
  }
  toggleLoader(true);
  axios
    .post(url, formData, {
      headers: headers,
    })
    .then((res) => {
      const modal = bootstrap.Modal.getInstance(
        document.getElementById(`exampleModalAddPost`)
      );
      modal.hide();
      showAlert(messageNote, "primary");
      const urlparam = new URLSearchParams(window.location.search);
      const id = urlparam.get("postId");
      let Sure = urlparam.get("Sure");
      let authorId = urlparam.get("authorId");
      if (id != null) {
        postClickedShowComments();
      } else if (authorId != null || Sure == 1) {
        profileCardInfo();
        getUserPosts();
      } else {
        currentPage = 1;
        reloaad = true;
        getPosts();
      }
    })
    .catch((error) => {
      const modal = bootstrap.Modal.getInstance(
        document.getElementById(`exampleModalAddPost`)
      );
      modal.hide();
      showAlert(error.message, "danger");
    })
    .finally(() => {
      toggleLoader(false);
    });
});

let profilInformation = (updateId) => {
  window.location = `./profile.html?authorId=${updateId}&Sure=1`;
};

let showAlert = (Message, color) => {
  const alertPlaceholder = document.getElementById("alert");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };
  appendAlert(Message, color);
};

isLogedInBtn();
