import { comments } from "./comments.js";
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

    const now = new Date();
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    const dateString = now.toLocaleString("ru-RU", options).replace(",", "");

    const newComment = {
      id: comments.length + 1,
      name,
      text: comment,
      date: dateString,
      likeCount: 0,
      liked: false,
    };

    comments.push(newComment);
    console.log(comments);
    renderComments();

    nameInput.value = "";
    commentInput.value = "";
  });
}
