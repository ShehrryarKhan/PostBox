let posts = [];
let isDarkTheme = false;

function createPost() {
    const text = document.getElementById('postText').value;
    const fileInput = document.getElementById('postImage');
    const imageFile = fileInput.files[0];
    let imageUrl = '';

    
    if (imageFile) {
        imageUrl = URL.createObjectURL(imageFile);
    }

    if (text || imageUrl) {  
        const newPost = {
            id: Date.now(),
            text,
            imageUrl,
            likes: 0,
            comments: []
        };
        posts.push(newPost);
        displayPosts();
        
        
        document.getElementById('postText').value = '';
        fileInput.value = '';
    }
}

function displayPosts() {
    const container = document.getElementById('posts-container');
    container.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';

        postElement.innerHTML = `
            <p>${post.text}</p>
            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post image">` : ''}
            <button onclick="likePost(${post.id})">👍 Like (${post.likes})</button>
            <button onclick="commentPost(${post.id})">💬 Comment</button>
            <div class="comments-section">
                <h4>Comments:</h4>
                <div id="comments-${post.id}">
                    ${post.comments.length === 0 ? '<p>No comments yet.</p>' : ''}
                </div>
            </div>
        `;

        container.appendChild(postElement);

        const commentsContainer = document.getElementById(`comments-${post.id}`);
        post.comments.forEach(comment => {
            const commentElement = document.createElement('p');
            commentElement.className = 'comment';
            commentElement.textContent = comment;
            commentsContainer.appendChild(commentElement);
        });
    });
}

function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) post.likes += 1;
    displayPosts();
}

function commentPost(postId) {
    const comment = prompt("Enter your comment:");
    const post = posts.find(p => p.id === postId);
    if (post && comment) {
        post.comments.push(comment);
        displayPosts();
    }
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme', isDarkTheme);
}
