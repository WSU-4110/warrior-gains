const app = require('./app');
const request = require('supertest');

describe('post', () => {

    it('status code 201, test passed', async () =>{
        const response = await request(app).post('/post').send({files:'screenshot1.png'})

        expect(response.statusCode).toEqual(201);
    })

});

describe('add-comment', () => {

    it('returns status code 201, test passed', async () =>{
        const response = await request(app).post('/add-comment').send({user:'Opy Ali', comment:'Nice Post'})

        expect(response.statusCode).toEqual(201);
    })

});

describe('like-dislike', () => {

    it('if passed return status code 200', async () =>{
        const response = await request(app).post('/like-dislike').send({user:'Opy Ali',
         _id:1, success:true, message:"Liked"})

        expect(response.statusCode).toEqual(200);
    });

    it('if passed return status code 200', async () =>{
        const response = await request(app).post('/like-dislike').send({user:'Opy Ali',
         _id:1, success:true, message:"Disliked"})

        expect(response.statusCode).toEqual(200);
    });

});


describe('edit-post', () => {

    it('returns status code 201 if passed', async () =>{
        
        const response = await request(app).get('/edit-post').set({data:post})

        expect(response.statusCode).toEqual(201);
    })
});


describe('update-post', () => {

    it('status code 201 if passed', async () =>{
        const response = await request(app).post('/update-post').send({_id:id,
         post})

        expect(response.statusCode).toEqual(201);
    });

    it('status code 201 if passed', async () =>{
        const response = await request(app).post('/update-post').send({_id:id,
         post, img:"/public/uploads/" + img_name})

        expect(response.statusCode).toEqual(201);
    });

});



describe('delete-post', () => {

    it('returns status code 201 if passed', async () =>{
        const response = await request(app).post('/delete-post').send({postId:2})

        expect(response.statusCode).toEqual(201);
    })

});









