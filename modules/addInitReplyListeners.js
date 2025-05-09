import { comments } from "./comments.js";

export const addInitReplyListeners = () => {
    document.querySelectorAll(".comment").forEach((comment) => {
        comment.addEventListener("click", () => {
            const id = comment.dataset.id;
            const currentComment = comments.find((c) => c.id === +id);
            const addCommentTextInput =
                document.getElementById("comment-input");
            addCommentTextInput.value = `${currentComment.author.name} > ${currentComment.text}`;
            addCommentTextInput.focus();
        });
    });
};
