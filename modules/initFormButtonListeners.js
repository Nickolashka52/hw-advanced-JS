import { postComments } from "./api.js";
import { fetchAndRenderComments } from "./fetchAndRenderComments.js";
import { sanitizeInput } from "./sanitizeInput.js";

const nameInput = document.getElementById("name-input");
const commentInput = document.getElementById("comment-input");
const addCommentBtn = document.getElementById("add-comment-btn");
const commentForm = document.getElementById("comment-form");
const addCommentLoader = document.getElementById("add-comment-loader");

export function initFormButtonListeners() {
    addCommentBtn.addEventListener("click", () => {
        const name = sanitizeInput(nameInput.value);
        const comment = sanitizeInput(commentInput.value);

        if (!name || !comment) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        const newComment = {
            name,
            text: comment,
        };

        commentForm.style.display = "none";
        addCommentLoader.style.display = "block";

        postComments(newComment)
            .then(() => {
                return fetchAndRenderComments();
            })
            .then(() => {
                commentForm.style.display = "flex";
                addCommentLoader.style.display = "none";
                nameInput.value = "";
                commentInput.value = "";
            });
    });
}
