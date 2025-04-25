import { comments } from './comments.js'
import { handleLikes } from './handleLikes.js'
import { addInitReplyListeners } from './addInitReplyListeners.js'

export const renderComments = () => {
    const commentsList = document.getElementById('comments-list')
    commentsList.innerHTML = ''

    const commentHtml = comments
        .map((comment) => {
            const classString = `like-button ${
                comment.liked ? '-active-like' : ''
            }`
            const newComment = `
      <li data-id="${comment.id}" class="comment">
        <div class="comment-header">
          <div class="comment-name">${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likeCount}</span>
            <button data-id="${comment.id}" class="${classString}"></button>
          </div>
        </div>
      </li>
        `
            return newComment
        })
        .join('')
    commentsList.innerHTML = commentHtml
    handleLikes()
    addInitReplyListeners()
}
