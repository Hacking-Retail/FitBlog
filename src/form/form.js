import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
let errors = [];

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const post = Object.fromEntries(formData.entries());

  if (formIsValid(post)) {
    try {
      const json = JSON.stringify(post);
      const response = await fetch(
        "https://fitnessblog-22c38.firebaseio.com/posts.json",
        {
          method: "POST",
          body: json,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const body = await response.json();
      console.log(body);
    } catch (e) {
      console.error("e :", e);
    }
  }
});

const formIsValid = (post) => {
  if (!post.author || !post.category || !post.content) {
    errors.push("Vous devez renseigner tous les champs ");
  } else {
    errors = [];
  }

  if (errors.length) {
    let errorHTML = "";
    errors.forEach((e) => {
      errorHTML += `<li> ${e} </li>`;
    });
    errorElement.innerHTML = errorHTML;

    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
};
