import { updateComments } from "./comments.js";
import { renderComments } from "./renderComments.js";

const firstLoader = document.getElementById("first-loader");

export const firstFetchAndRenderComments = () => {
    firstLoader.style.display = "block";
    return fetch("https://wedev-api.sky.pro/api/v1/nickolay-led/comments")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            updateComments(data.comments);
            renderComments();
        })
        .then(() => {
            firstLoader.style.display = "none";
        });
};
