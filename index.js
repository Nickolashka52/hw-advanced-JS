import { fetchComments } from "./modules/api.js";
import { updateComments } from "./modules/comments.js";
import { initFormButtonListeners } from "./modules/initFormButtonListeners.js";
import { renderComments } from "./modules/renderComments.js";

document.querySelector(".comments").innerHTML = "Пожалуйста подождите...";

fetchComments()
    .then((data) => {
        updateComments(data);
        renderComments();
    })
    .catch((error) => {
        if (error.message === "Ошибка сервера") {
            return alert("Ошибка на нашей стороне, поробуйте позже");
        }
        alert(error.message);
    });

initFormButtonListeners();
