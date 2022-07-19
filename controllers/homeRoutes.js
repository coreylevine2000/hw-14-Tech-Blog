const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = postData.map((post) => post.get({ plain: true }));

// const blogs = [
//   {
//     title: "title",
//     content: "content",
//     author: "author",
//     date: "1/7/2022",
//   },
//   {
//     title: "title2",
//     content: "content2",
//     author: "author2",
//     date: "1/7/2022",
//   },
//   {
//     title: "3",
//     content: "content3",
//     author: "author3",
//     date: "1/7/2022",
//   },
// ];

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in, 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
 //router.get('/dashboard', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    
    const user = userData.get({ plain: true });

    console.log('user', user),


    // const blogs = [
    //   {
    //     id: 1,
    //     title: "title",
    //     content: "content",
    //     author: "author",
    //     date: "1/7/2022",
    //   },
    //   {
    //     id: 1,
    //     title: "title2",
    //     content: "content2",
    //     author: "author2",
    //     date: "1/7/2022",
    //   },
    //   {
    //     id: 2,
    //     title: "3",
    //     content: "content3",
    //     author: "author3",
    //     date: "1/7/2022",
    //   },
    // ];

    res.render('dashboard', {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/create-blog', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  // if (req.session.logged_in) {
  //   res.redirect('/profile');
  //   return;
  // }

  res.render('create-blog', {
    logged_in: true,
  });
});

router.get('/edit-blog', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  // if (req.session.logged_in) {
  //   res.redirect('/profile');
  //   return;
  // }

  const blog = {
    id: 'id',
    title: "title2",
      content: "content",
      author: "author",
      date: "1/7/2022",
  };

  res.render('edit-blog', {
    ...blog,
    logged_in: true,
  });
});

router.get('/blogs/:id', async (req, res) => {
  const postData = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        include: {
          model: User,
        attributes: ['username'],
        }
      }
    ],
  });

  const blog = postData.get({ plain: true });


  // const blog = {
  //   id: 'id',
  //   title: "title2",
  //   content: "content",
  //   author: "author",
  //   date: "1/7/2022",
  //     comments: [
  //       {
  //         content: "this is a comment",
  //         author: "author",
  //         date: "1/1/2022",
  //       },
  //       {
  //         content: "this is another comment",
  //         author: "author2",
  //         date: "1/3/2022",
  //       },
  //     ],
  // };

  res.render('blog-page', {
    ...blog,
    logged_in: true,
  });
});
module.exports = router;
