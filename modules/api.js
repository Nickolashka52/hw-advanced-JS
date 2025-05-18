export const fetchComments = () => {
    return fetch("https://wedev-api.sky.pro/api/v1/nickolay-led/comments")
    .then((response) => {
            return response.json();
        },
    );
};

export const postComments = (newComment) => {
    return fetch("https://wedev-api.sky.pro/api/v1/nickolay-led/comments", {
        method: "POST",
        body: JSON.stringify(newComment),
    }).then((response) => {
        return response.json();
    });
};
