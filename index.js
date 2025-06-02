import { fetchComments } from "./modules/api.js";
import { updateComments } from "./modules/comments.js";
import { renderComments } from "./modules/renderComments.js";

export const fetchAndRenderComments = (isFirstLoading) => {
    if (isFirstLoading) {
        document.querySelector(".container").innerHTML =
            `<p>Пожалуйста подождите, загружаю комментарии...</p>`;
    }

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
};

fetchAndRenderComments(true);
