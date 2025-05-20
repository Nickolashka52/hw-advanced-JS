import { updateComments } from "./comments.js";
import { renderComments } from "./renderComments.js";

export const fetchAndRenderComments = () => {
    return fetch("https://wedev-api.sky.pro/api/v1/nickolay-led/comments")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            updateComments(data.comments);
            renderComments();
        });
};
