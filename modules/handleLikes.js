import { comments } from "./comments.js";
import { renderComments } from "./renderComments.js";

export const handleLikes = () => {
    const likeButtons = document.querySelectorAll(".like-button");
    likeButtons.forEach((likeButton) => {
        likeButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const id = likeButton.dataset.id;
            const comment = comments.find((c) => c.id === +id);
            if (comment.isLiked) {
                comment.isLiked = false;
                comment.likes -= 1;
            } else {
                comment.isLiked = true;
                comment.likes += 1;
            }
            renderComments();
        });
    });
};
