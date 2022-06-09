    const newCommentHandler = async (evt)=> {
        
    evt.preventDefault();
    console.log("New Comment Button Clicked");
    const body = document.querySelector('#comment-text').value;
    const postId= window.location.pathname.split('/')[2]
    console.log('postID', postId)
    await fetch('/api/posts/comment',{
        method: 'POST',
        body: JSON.stringify({
            body,
            postId
        }),
        headers: { 'Content-Type' : 'application/JSON'},
    });
    window.location.reload();

}

document.querySelector('#comment-submit').addEventListener('click', newCommentHandler);