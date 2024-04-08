async function fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    return posts;
}

async function fetchComments(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    const comments = await response.json();
    return comments;
}

function generateRandomAvatar() {
    const randomId = Math.floor(Math.random() * 1000); 
    return `https://picsum.photos/id/${randomId}/50/50`;
}

async function displayPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = ''; 

    const posts = await fetchPosts();

    posts.forEach(async post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const comments = await fetchComments(post.id);

        postElement.innerHTML = `
            <div class="post-header">
                <img src="${generateRandomAvatar()}" alt="User Avatar">
                <h2>${post.title}</h2>
            </div>
            <p>${post.body}</p>
            <button class="toggle-comments">Comments (${comments.length})</button>
            <div class="comments" style="display: none;">
                <h3>Comments:</h3>
                <ul>
                    ${comments.map(comment => `<li>${comment.name}: ${comment.body}</li>`).join('')}
                </ul>
            </div>
        `;

        
        postsContainer.appendChild(postElement);
    });

    postsContainer.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('toggle-comments')) {
            const commentsSection = target.nextElementSibling;
            commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
        }
    });
}

displayPosts();

function handleNavigation(event) {
    event.preventDefault(); 
    const targetPage = event.target.getAttribute('href'); 
    if (targetPage === '#') {
        window.location.href = 'development-in-progress.html';
    } else {
        window.location.href = 'index.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const profileLink = document.querySelector('nav ul li:nth-child(2) a');
    const messagesLink = document.querySelector('nav ul li:nth-child(3) a');
    profileLink.addEventListener('click', handleNavigation);
    messagesLink.addEventListener('click', handleNavigation);
});
