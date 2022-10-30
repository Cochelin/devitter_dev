const express = require('express');
const app = express();
const port = 5000;
require('dotenv/config');

const { Pool } = require('pg');

const pg = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PW,
  port: process.env.PORT,
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// user table

// get All Users
app.get('/user/get', (req, resp) => {
  pg.query('SELECT * FROM users;')
    .then((res) => {
      const rows = res.rows;
      console.log(rows[0]);
      resp.status(200).json(rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get User by Id

app.get('/user/get/:id', (req, resp) => {
  const id = req.params.id;
  pg.query('SELECT * FROM users where id = $1;', [id])
    .then((res) => {
      const rows = res.rows;
      console.log(rows[0]);
      resp.status(200).json(rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

// post user

app.get('/user/create', (req, resp) => {
  const { name, email, profile, nickname } = req.body;
  pg.query(
    'INSERT INTO users (name, email, profile, nickname) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, profile, nickname]
  )
    .then((res) => {
      resp.status(201).json(`User deleted with ID: ${id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

// delete user

app.get('/user/delete/:id', (req, resp) => {
  const id = req.params.id;
  pg.query('DELETE FROM users WHERE id = $1', [id])
    .then((res) => {
      resp.status(200).json(`User added with ID: ${res.rows[0].id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

// tweets table

// get All Tweets

app.get('/tweet/get', (req, resp) => {
  pg.query('SELECT * FROM tweets;')
    .then((res) => {
      const rows = res.rows;
      console.log(rows[0]);
      resp.status(200).json(rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get Tweet by id

app.get('/tweet/get/:id', (req, resp) => {
  const id = req.params.id;
  pg.query('SELECT * FROM tweets where id = $1;', [id])
    .then((res) => {
      const rows = res.rows;
      console.log(rows[0]);
      resp.status(200).json(rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

// post tweet

app.get('/tweet/create', (req, resp) => {
  const {
    profile,
    tweet_id,
    tweet_name,
    tweet_content,
    date,
    tweet_retweet,
    tweet_heart,
    tweet_link,
  } = req.body;
  pg.query(
    'INSERT INTO tweets (profile, tweet_id, tweet_name, tweet_content, date, tweet_retweet, tweet_heart, tweet_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [
      profile,
      tweet_id,
      tweet_name,
      tweet_content,
      date,
      tweet_retweet,
      tweet_heart,
      tweet_link,
    ]
  )
    .then((res) => {
      resp.status(201).json(`User added with ID: ${res.rows[0].id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

// delete tweet

app.get('/tweet/delete/:id', (req, resp) => {
  const id = req.params.id;
  pg.query('DELETE FROM tweets WHERE id = $1', [id])
    .then((res) => {
      resp.status(200).json(`User deleted with ID: ${id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

// bookmark table

// get All bookmarks

app.get('/bookmark/get', (req, resp) => {
  pg.query('SELECT * FROM bookmark;')
    .then((res) => {
      const rows = res.rows;
      console.log(rows[0]);
      resp.status(200).json(rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get bookmark by id

app.get('/bookmark/get/:id', (req, resp) => {
  const id = req.params.id;
  pg.query('SELECT * FROM bookmark where id = $1;', [id])
    .then((res) => {
      const rows = res.rows;
      console.log(rows[0]);
      resp.status(200).json(rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

// post bookmark

app.get('/bookmark/create', (req, resp) => {
  const { user_id, name } = req.body;
  pg.query('INSERT INTO bookmark (user_id, name) VALUES ($1, $2) RETURNING *', [
    user_id,
    name,
  ])
    .then((res) => {
      resp.status(201).json(`User added with ID: ${res.rows[0].id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

// delete tweet

app.get('/bookmark/delete/:id', (req, resp) => {
  const id = req.params.id;
  pg.query('DELETE FROM bookmark WHERE id = $1', [id])
    .then((res) => {
      resp.status(200).json(`User deleted with ID: ${id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

// bookmark_tweet table

// get All bookmark_tweet

app.get('/bookmark/tweets/get', (req, resp) => {
  pg.query('SELECT * FROM bookmark_tweet;')
    .then((res) => {
      const rows = res.rows;
      console.log(rows[0]);
      resp.status(200).json(rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get bookmark_tweet by id

app.get('/bookmark/tweets/get/:id', (req, resp) => {
  const id = req.params.id;
  pg.query('SELECT * FROM bookmark_tweet where id = $1;', [id])
    .then((res) => {
      const rows = res.rows;
      console.log(rows[0]);
      resp.status(200).json(rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

// post bookmark_tweet

app.get('/bookmark/tweets/create', (req, resp) => {
  const { user_id, bookmark_id } = req.body;
  pg.query(
    'INSERT INTO bookmark_tweet (user_id, bookmark_id) VALUES ($1, $2) RETURNING *',
    [user_id, bookmark_id]
  )
    .then((res) => {
      resp.status(201).json(`User added with ID: ${res.rows[0].id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

// delete bookmark tweet

app.get('/bookmark/tweets/delete/:id', (req, resp) => {
  const id = req.params.id;
  pg.query('DELETE FROM bookmark_tweet WHERE id = $1', [id])
    .then((res) => {
      resp.status(200).json(`User deleted with ID: ${id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

// subbookmark table

// get All subbookmark

app.get('/subBookmark/get', (req, resp) => {
  pg.query('SELECT * FROM subbookmark;')
    .then((res) => {
      const rows = res.rows;
      console.log(rows[0]);
      resp.status(200).json(rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get subbookmark by id

app.get('/subBookmark/get/:id', (req, resp) => {
  const id = req.params.id;
  pg.query('SELECT * FROM subbookmark where id = $1;', [id])
    .then((res) => {
      const rows = res.rows;
      console.log(rows[0]);
      resp.status(200).json(rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

// post subbookmark

app.get('/subBookmark/create', (req, resp) => {
  const { name, parent, user_id } = req.body;
  pg.query(
    'INSERT INTO subbookmark (name, parent, user_id) VALUES ($1, $2, $3) RETURNING *',
    [name, parent, user_id]
  )
    .then((res) => {
      resp.status(201).json(`User added with ID: ${res.rows[0].id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

// delete bookmark tweet

app.get('/subBookmark/delete/:id', (req, resp) => {
  const id = req.params.id;
  pg.query('DELETE FROM subbookmark WHERE id = $1', [id])
    .then((res) => {
      resp.status(200).json(`User deleted with ID: ${id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`http://localhost:${port} 에서 서버가 실행됩니다.`);
});
