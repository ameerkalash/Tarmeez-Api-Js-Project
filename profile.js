const urlparam = new URLSearchParams(window.location.search);
let authorId = urlparam.get("authorId");
if (authorId == null) {
  authorId = currentUser().id;
}

let profileCardInfo = () => {
  axios
    .get(`https://tarmeezacademy.com/api/v1/users/${authorId}`)
    .then((res) => {
      document.getElementById(`nameCardProfile`).innerHTML = res.data.data.name;
      document.getElementById(`usernameCardProfile`).innerHTML =
        res.data.data.username;
      document.getElementById(`postCountCardProfile`).innerHTML =
        res.data.data.posts_count;
      document.getElementById(`commentCountCardProfile`).innerHTML =
        res.data.data.comments_count;
      document.getElementById(`nameUnderCardProfile`).innerHTML =
        res.data.data.username;
      document.getElementById(`imgCardProfile`).src = virtualProfile_image(
        res.data.data.profile_image
      );
    })
    .catch((error) => {
      showAlert(error.response.data.message, "danger");
    });
};

let getUserPosts = () => {
  axios
    .get(`https://tarmeezacademy.com/api/v1/users/${authorId}/posts`)
    .then((res) => {
      let posts = res.data.data;
      document.getElementById("user_posts").innerHTML = ``;
      for (let i = posts.length - 1; i >= 0; i--) {
        let Id = res.data.data[i].id;
        let updateId = res.data.data[i].author.id;
        let card = `
                  <div class="card" id="card">
                  <div class="card-header card-header2">
                    <img class="img-header-post" src="${virtualProfile_image(
                      res.data.data[i].author.profile_image
                    )}">
                    <span class="username">${
                      res.data.data[i].author.username
                    }</span>
                  <div class="boxOfBtnCard">
                    <div class="updatePost" id="updatePost" onclick="updatePostInfo('${encodeURIComponent(
                      JSON.stringify(res.data.data[i])
                    )}')">
                      ${updatePost(updateId)}
                    </div>
                    <div class="deletePost" id="deletePost">
                    ${deletePost(updateId, Id)}
                    </div>
                  </div>
                  </div>
                  <div class="card-body" id="card-body" onclick="postClicked(${Id})">
                    <img src="${findBodyImage(
                      res.data.data[i].image
                    )}" class="img-body">
                    <p class="time-ago-post">${res.data.data[i].created_at}</p>
                    <h5 class="title-body">${res.data.data[i].title}</h5>
                    <p class="content-post">${res.data.data[i].body}</p>
                    <hr>
                    <div class="comment-count" id="comment-count">
                      <svg style="display = 'inline'" width="16" height="16" fill="currentColor" class="bi bi-pen"
                        viewBox="0 0 16 16">
                        <path
                          d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                      </svg>
                      <span>
                        (${res.data.data[i].comments_count}) Comments
                      </span>
                      <span class="tags" id="tags_${Id}">
                        ${getTags(Id)}
                      </span>
                    </div>
                  </div>
                </div>
          `;
        document.getElementById("user_posts").innerHTML += card;
      }
    })
    .catch((error) => {
      showAlert(error.response.data.message, "danger");
    });
};

getUserPosts();
profileCardInfo();
