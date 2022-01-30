const functions = require('firebase-functions');
const cors = require('cors')({
    origin: true
});
const admin = require('firebase-admin')

admin.initializeApp();

exports.updateLike = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        const db = admin.firestore();
        const posts = await db.collection('posts').doc(request.body.post);
        const post = await posts.get()

        if (!post.exists) {
            // Create the document first...
            await db.collection('posts').doc(request.body.post).set({likes:1});
        } else {
            // Update the document... post.data()
            const initialData = post.data()
            const newData = {
                likes: initialData.likes + 1
            }
            await db.collection('posts').doc(request.body.post).set(newData);
        }
        const postsAfter = await db.collection('posts').doc(request.body.post);
        const postAfter = await postsAfter.get()        
        response.send(postAfter.data())
    })
})

exports.getLikes = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        const db = admin.firestore();
        const postsAfter = await db.collection('posts').doc(request.body.post);
        const postAfter = await postsAfter.get()        
        response.send(postAfter.data())
    })
})