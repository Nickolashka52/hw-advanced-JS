'use strict'
const nameInput = document.getElementById('name-input')
const commentInput = document.getElementById('comment-input')
const addCommentBtn = document.getElementById('add-comment-btn')
const commentsList = document.getElementById('comments-list')

const comments = [
    {
        id: 1,
        name: 'Глеб Фокин',
        date: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
        likeCount: 3,
        liked: true,
    },
    {
        id: 2,
        name: 'Варвара Н.',
        date: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤',
        likeCount: 75,
        liked: false,
    },
]

function renderComments() {
    commentsList.innerHTML = ''

    const commentHtml = comments
        .map((comment) => {
            const classString = `like-button ${comment.liked ? '-active-like' : ''}`
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

addCommentBtn.addEventListener('click', () => {
    const name = nameInput.value
        .trim()
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
    const comment = commentInput.value
        .trim()
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')

    if (!name || !comment) {
        alert('Пожалуйста, заполните все поля.')
        return
    }

    const now = new Date()
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    }
    const dateString = now.toLocaleString('ru-RU', options).replace(',', '')

    const newComment = {
        id: comments.length + 1,
        name,
        text: comment,
        date: dateString,
        likeCount: 0,
        liked: false,
    }

    comments.push(newComment)
    console.log(comments)
    renderComments()

    nameInput.value = ''
    commentInput.value = ''
})

function handleLikes() {
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

renderComments()

function addInitReplyListeners() {
    document.querySelectorAll('.comment').forEach((comment) => {
        comment.addEventListener('click', () => {
            const id = comment.dataset.id
            const currentComment = comments.find((c) => c.id === +id)
            const addCommentTextInput = document.getElementById('comment-input')
            addCommentTextInput.value = `${currentComment.name} > ${currentComment.text}`
            addCommentTextInput.focus()
        })
    })
}
