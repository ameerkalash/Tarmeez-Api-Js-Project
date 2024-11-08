// TO DO :::: Make (id) Global

let postClickedShowComments = () => {
  const urlparam = new URLSearchParams(window.location.search);
  const id = urlparam.get("postId");
  axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`).then((res) => {
    let updateId = res.data.data.author.id;
    let commentss = res.data.data.comments;
    let card = `
    <div class="card-header card-header2">
    <span class="headerCardProfileInfo" onclick="profilInformation(${updateId})">
      <img onclick="profilInformation(${updateId})" class="img-header-post" src="${virtualProfile_image(
      res.data.data.author.profile_image
    )}">
    <span onclick="profilInformation(${updateId})" class="username">${
      res.data.data.author.username
    }
    </span>
    </span>
      <div class="updatePost" id="updatePost" onclick="updatePostInfo('${encodeURIComponent(
        JSON.stringify(res.data.data)
      )}')">
        ${updatePost(updateId)}
      </div>  
    </div>
    <div class="card-body" id="card-body">
      <img src="${findBodyImage(res.data.data.image)}" class="img-body">
      <p class="time-ago-post">${res.data.data.created_at}</p>
      <h5 class="title-body">${res.data.data.title}</h5>
      <p class="content-post">${res.data.data.body}</p>
      <hr>
      <div class="comment-count" id="comment-count">
        <svg style="display = 'inline'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen"
          viewBox="0 0 16 16">
          <path
            d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
        </svg>
        <span>
          (${res.data.data.comments_count}) Comments
        </span>
        <span class="tags" id="tags_${id}"> 
          ${getTags(id)}
        </span>
      </div>
    </div>
    <hr style="margin-bottom: 0px;">
    <div class="comments" id="comments">
    ${showComments(commentss)}
    </div>
    <div class="writeComment" id="writeComment">
      ${sureSendComeent(id)}
    </div>
    `;
    document.getElementById(`card`).innerHTML = card;
  });
};

let sureSendComeent = (Id) => {
  const sureTokenFind = localStorage.getItem("token");
  let writeComment = `
    <input id="comeentInput" type="text" placeholder="write New Comment...">
    <button type="button" class="btnComment" id="writeComment" onclick="sendComment(${Id})">SEND</button>
  `;
  if (sureTokenFind == null) {
    return "";
  } else {
    return writeComment;
  }
};

let showComments = (commentss) => {
  let allComments = ``;
  for (commen of commentss) {
    allComments += `
    <div class="comment">
        <div class="topComment">
      <span class="headerCardProfileInfo" onclick="profilInformation(${
        commen.author.id
      })">
            <img class="img-header-post" src="${virtualProfile_image(
              commen.author.profile_image
            )}">
            <span class="username">${commen.author.username}</span>
      </span>
    </div>
    <div class="bodyComment">
      <p>${commen.body}</p>
    </div>
    </div>
    <hr>
    `;
  }
  return allComments;
};

let sendComment = (Id) => {
  const sureTokenFind = localStorage.getItem("token");
  const comeentInput = document.getElementById(`comeentInput`).value;
  let commentValue = {
    body: comeentInput,
  };
  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sureTokenFind}`,
  };
  axios
    .post(
      `https://tarmeezacademy.com/api/v1/posts/${Id}/comments`,
      commentValue,
      {
        headers: headers,
      }
    )
    .then((res) => {
      postClickedShowComments();
    })
    .catch((error) => {
      showAlert(error.response.data.message, "danger");
    });
};

postClickedShowComments();
