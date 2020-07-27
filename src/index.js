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
    <p class="post-author">${post.author}</p>
    <p class="post-content">
    ${post.content}
    </p>
    <div class="post-actions">
        <button class="btn btn-danger" data-id = ${post._id}>Supprimer</button>
    </div>
         
    `;
    return postDOM;
  });
  postContainerElement.innerHTML = "";
  postContainerElement.append(...postsDOM);
};

const fetchPost = async () => {
  try {
    const response = await fetch(
      "https://fitnessblog-22c38.firebaseio.com/posts.json"
    );
    const posts = await response.json();
    if (posts) {
      const postsArray = Object.values(posts);
      createPost(postsArray);
    }
  } catch (e) {
    console.log("e :", e);
  }
};

fetchPost();
