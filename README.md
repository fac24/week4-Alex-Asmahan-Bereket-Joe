# week4-Alex-Asmahan-Bereket-Joe

## How to use

Deployed on Heroku here: http://fac24-week4-project.herokuapp.com/

Visit: http://fac24-week4-project.herokuapp.com/signup

Try logging out, logging back in, visiting http://fac24-week4-project.herokuapp.com/posts

(Posting itself doesn't work yet :)

(Sorry there aren't convenient signup/login links everywhere you need them, yet! Lots of manual address typing.)

## How to run in your local dev environment

1. Open a terminal on your computer.
2. ``cd`` to the folder where you like to keep projects.
3. ``git clone [URL of our GitHub repo]``
4. ``cd`` into the folder that git just made for you.
5. ``npm install``
6. Check if there are working scripts to create the local testing database and ``.env`` file.
   - (They might be in the ``/scripts`` folder, often ``/scripts/create_db`` and ``/scripts/populate_db``.)
   - If they're there and they work, run them :)
7. If there are no working scripts, you'll need to create your own local testing database and ``.env`` file manually:
   - (DATABASE_URL='[your local testing db details]')
8. You'll also need a **``COOKIE_SECRET='...'``** line in your ``.env`` file.
9. When you're ready to run your local dev server, ``npm run dev`` (or whatever the group decided the script should be called in ``package.json``)
10. When you're ready to test with Cypress, run ``npm test``.
