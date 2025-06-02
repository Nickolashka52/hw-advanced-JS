import { comments } from "./comments.js";
import { name, token } from "./api.js";
import { handleLikes } from "./handleLikes.js";
import { addInitReplyListeners } from "./addInitReplyListeners.js";
import { renderLogin } from "./renderLogin.js";
import { initFormButtonListeners } from "./initFormButtonListeners.js";

export const renderComments = () => {
    const container = document.querySelector(".container");

    const commentsHtml = comments
        .map((comment) => {
            const classString = `like-button ${
                comment.isLiked ? "-active-like" : ""
            }`;
            const newComment = `
      <li data-id="${comment.id}" class="comment">
        <div class="comment-header">
          <div class="comment-name">${comment.name}</div>
          <div>${new Date(comment.date).toLocaleDateString()}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button data-id="${comment.id}" class="${classString}"></button>
          </div>
        </div>
      </li>
      `;
            return newComment;
        })
        .join("");

    const addCommentsHtml = `
            <div id="comment-form" class="add-form">
                <input
                    type="text"
                    class="add-form-name"
                    placeholder="Введите ваше имя"
                    readonly
                    value="${name}"
                    id="name-input"
                />
                <textarea
                    type="textarea"
                    class="add-form-text"
                    placeholder="Введите ваш коментарий"
                    rows="4"
                    id="comment-input"
                ></textarea>
                <div class="add-form-row">
                    <button class="add-form-button" id="add-comment-btn">
                        Написать
                    </button>
                </div>
            </div>
            <div
                id="add-comment-loader"
                style="display: none; margin-top: 20px"
            >
                Комментарий добавляется...
            </div>
    `;

    const linkToLoginText = `<p>чтобы отправить комментарий, <span class="link-login">войдите</span></p>`;

    const baseHtml = `
      <ul class="comments" id="comments-list">${commentsHtml}</ul>
      ${token ? addCommentsHtml : linkToLoginText}
    `;

    container.innerHTML = baseHtml;

    if (token) {
        handleLikes();
        addInitReplyListeners();
        initFormButtonListeners();
    } else {
        document.querySelector(".link-login").addEventListener("click", () => {
            renderLogin();
        });
    }
};
