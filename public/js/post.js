const newPostHandler = async (evt)=> {
    evt.preventDefault();
    const title = document.querySelector('#create-post-title').value 
    const body = document.querySelector('#create-post-content').value;
    
    await fetch('/api/posts/edit/',{
        method: 'POST',
        body: JSON.stringify({
            title,
            body,
        }),
        headers: { 'Content-Type' : 'application/JSON'},
    });

    window.location.replace('/dashboard');

}

const cancelHandler = async (evt)=> {
    evt.preventDefault();
    window.location.replace('/dashboard');
}
document.querySelector('#create-post-form').addEventListener('submit', newPostHandler);
document.querySelector('#cancel').addEventListener('click', cancelHandler);
