export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/nickolay-led/comments").then(
        (response) => {
            return response.json();
        },
    );
}
