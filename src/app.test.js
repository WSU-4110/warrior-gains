import supertest from 'supertest'
import app from './app.js'

// When user registers on registration page
let elementId;

describe("when passed a username and password", () => {
    // Hidden for simplicity
    test("POST /register", (done) => {
        request(app)
            .post("/register")
            .expect("Content-Type", /json/)
            .send({
                email: "ofaruk@wayne.edu",
            })
            .expect(201)
            .expect((res) => {
                res.body.data.length = 2;
                res.body.data[0].email = "test@wayne.edu";
                res.body.data[1].email = "ofaruk@wayne.edu";
            })
            .end((err, res) => {
                if (err) return done(err);
                elementId = res.body.data[1].id;
                return done();
            });
    });
    // More things come here
});


// When home page loads
describe("When user views home page", () => {
    test("GET /", (done) => {
        request(app)
            .get("/")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                res.body.data.length = 1;
                res.body.data[0].email = "test@wayne.edu";
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });

});

// When login page loads
describe("When user views login page", () => {
    test("GET /login", (done) => {
        request(app)
            .get("/login")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                res.body.data.length = 1;
                res.body.data[0].email = "test@wayne.edu";
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });

});

// When register page loads
describe("When user views register page", () => {
    test("GET /register", (done) => {
        request(app)
            .get("/register")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                res.body.data.length = 1;
                res.body.data[0].email = "test@wayne.edu";
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });

});

// When forgot page loads
describe("When user views forgot page", () => {
    test("GET /forgot", (done) => {
        request(app)
            .get("/forgot")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                res.body.data.length = 1;
                res.body.data[0].email = "test@wayne.edu";
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
});

// When reset page loads
describe("When user views reset page", () => {
    test("GET /reset", (done) => {
        request(app)
            .get("/reset")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                res.body.data.length = 1;
                res.body.data[0].email = "test@wayne.edu";
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });

});

