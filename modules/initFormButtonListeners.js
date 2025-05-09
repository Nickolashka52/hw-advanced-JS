import { getComments } from "./api.js";
import { updateComments } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { sanitizeInput } from "./sanitizeInput.js";

const nameInput = document.getElementById("name-input");
const commentInput = document.getElementById("comment-input");
const addCommentBtn = document.getElementById("add-comment-btn");

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

        fetch("https://wedev-api.sky.pro/api/v1/nickolay-led/comments", {
            method: "POST",
            body: JSON.stringify(newComment),
        })
            .then(() => {
                return getComments();
            })
            .then((data) => {
                updateComments(data.comments);
                renderComments();
            });

        //comments.push(newComment);
        //renderComments();

        nameInput.value = "";
        commentInput.value = "";
    });
}
