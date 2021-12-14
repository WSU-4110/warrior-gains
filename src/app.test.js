const app = require('./app');
const request = require('supertest');

it('Testing to see if Jest works', () => {
    expect(1).toBe(1)
  })

describe("rendering profile page", () => {
    test("/profile", (done) => {
        request(app)
            .get("/profile")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                res.body.data.length = 1;
                res.body.data[0].username = "Joe";
            })
    });
});

describe("user can view edit", () => {
    it("get edit", async () => {
      await request(app)
        .get("/edit")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });


it('gets the test endpoint', async done => {
    const response = await request.get('/editP')
  
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('pass!')
    done()
  })
describe('get first first name', () => {

    it('test passed', async () =>{
        const response = await request(app).post('/profile').send({fname:'sayem'})

        expect(response.statusCode).toEqual(201);
    })

});
describe('get last name', () => {

    it('test passed', async () =>{
        const response = await request(app).post('/profile').send({lname:'ahmed'})

        expect(response.statusCode).toEqual(201);
    })

});

describe('get email', () => {

    it('test passed', async () =>{
        const response = await request(app).post('/profile').send({email:'test@wayne.edu'})

        expect(response.statusCode).toEqual(201);
    })

});