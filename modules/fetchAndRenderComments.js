import { fetchComments } from "./api.js";
import { updateComments } from "./comments.js";
import { renderComments } from "./renderComments.js";

let isFirstRender = true;
export const firstLoader = document.getElementById("first-loader");

export const fetchAndRenderComments = () => {
    if (isFirstRender) {
        firstLoader.style.display = "block";
        isFirstRender = false;
    }

    return fetchComments()
        .then((data) => {
            updateComments(data.comments);
            renderComments();
        })
        .then(() => {
            firstLoader.style.display = "none";
        });
};
