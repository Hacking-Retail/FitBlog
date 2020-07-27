import "./assets/styles/styles.scss";
import "./index.scss";

const postContainerElement = document.querySelector(".posts-container");

const createPost = (posts) => {
  const postsDOM = posts.map((post) => {
    const postDOM = document.createElement("div");
    postDOM.classList.add("post");
    postDOM.innerHTML = `
    
    <img src="${post.image}" alt="profile">
    <h2>${post.title} </h2>
    <p class="post-author">${post.author} - ${post.category}</p>
    <p class="post-content">
    ${post.content}
    </p>
    <div class="post-actions">
        <button class="btn btn-danger" data-id = ${post._id}>Supprimer</button>
    </div>
         
    `;
    console.log(post._id);
    return postDOM;
  });

  postContainerElement.innerHTML = "";
  postContainerElement.append(...postsDOM);
  const deleteButtons = postContainerElement.querySelectorAll(".btn-danger");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      try {
        const target = event.target;
        const postId = target.dataset.id;
        const response = await fetch(`https://restapi.fr/api/posts/${postId}`, {
          method: "DELETE",
        });
        const body = await response.json();
        console.log(body);
        fetchPost();
      } catch (e) {
        console.log("e : ", e);
      }
    });
  });
};

const fetchPost = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/posts");
    const posts = await response.json();
    createPost(posts);
  } catch (e) {
    console.log("e :", e);
  }
};

fetchPost();
