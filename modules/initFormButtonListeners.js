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

        fetch("https://wedev-api.sky.pro/api/v1/nickolay-led/comments", {
            method: "POST",
            body: JSON.stringify(newComment),
        })
            .then(() => {
                return fetchAndRenderComments();
            })
            .then(() => {
                addCommentLoader.style.display = "none";
                commentForm.style.display = "block";
                nameInput.value = "";
                commentInput.value = "";
            });
    });
}
