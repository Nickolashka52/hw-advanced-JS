const host = "https://wedev-api.sky.pro/api/v1/nickolay-led";

export const fetchComments = () => {
    return fetch(host + "/comments")
        .then((response) => {
            if (response.status === 500) {
                throw new Error("Ошибка сервера");
            }
            if (response.status === 200) {
                return response.json();
            }
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    id: comment.id,
                    name: comment.author.name,
                    date: new Date(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                };
            });
            return appComments;
        });
};

export const postComments = (text, name) => {
    return fetch(host + "/comments", {
        method: "POST",
        body: JSON.stringify({
            text,
            name,
            forceError: true,
        }),
    }).then((response) => {
        if (response.status === 500) {
            throw new Error("Ошибка сервера");
        }

        if (response.status === 400) {
            throw new Error("Неверный запрос");
        }

        if (response.status === 201) {
            return response.json();
        }
    });
};
