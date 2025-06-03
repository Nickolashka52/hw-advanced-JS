import { fetchComments, postComments } from "./api.js";
import { updateComments } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { sanitizeInput } from "./sanitizeInput.js";

export function initFormButtonListeners() {
    const addCommentBtn = document.getElementById("add-comment-btn");
    addCommentBtn.addEventListener("click", handlePostClick);
}

const handlePostClick = () => {
    const nameInput = document.getElementById("name-input");
    const commentInput = document.getElementById("comment-input");
    const commentForm = document.getElementById("comment-form");
    const addCommentLoader = document.getElementById("add-comment-loader");

    const name = sanitizeInput(nameInput.value);
    const comment = sanitizeInput(commentInput.value);

    if (!name || !comment) {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    commentForm.style.display = "none";
    addCommentLoader.style.display = "block";

    postComments(comment, name)
        .then(() => {
            return fetchComments().then((data) => {
                updateComments(data);
                renderComments();
            });
        })
        .then(() => {
            commentForm.style.display = "flex";
            addCommentLoader.style.display = "none";
            nameInput.value = "";
            commentInput.value = "";
        })
        .catch((error) => {
            commentForm.style.display = "flex";
            addCommentLoader.style.display = "none";

            if (error.message === "Failed to fetch") {
                alert("Нет интернета, попробуйте снова");
            }

            if (error.message === "Неверный запрос") {
                alert("Имя и комментарий должны быть не короче 3х символов");
            }

            if (error.message === "Ошибка сервера") {
                handlePostClick();
            }
        });
};
