import { getComments } from "./modules/api.js";
import { updateComments } from "./modules/comments.js";
import { initFormButtonListeners } from "./modules/initFormButtonListeners.js";
import { renderComments } from "./modules/renderComments.js";

getComments().then((data) => {
    updateComments(data.comments);
    renderComments();
});

initFormButtonListeners();
