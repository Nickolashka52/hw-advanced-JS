import { comments } from './comments.js'
import { renderComments } from './renderComments.js'

export const handleLikes = () => {
    const likeButtons = document.querySelectorAll('.like-button')
    likeButtons.forEach((likeButton) => {
        likeButton.addEventListener('click', () => {
            event.stopPropagation()
            const id = likeButton.dataset.id
            const comment = comments.find((c) => c.id === +id)

            if (comment.liked) {
                comment.liked = false
                comment.likeCount -= 1
            } else {
                comment.liked = true
                comment.likeCount += 1
            }
            renderComments()
        })
    })
}
