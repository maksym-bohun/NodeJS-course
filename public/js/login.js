const login = async (email, password) => {
  try {
    const res = await fetch('http://127.0.0.1:3000/api/v1/users/login', {
      method: 'POST',
      body: { email, password },
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
    });

    // axios({
    //   method: 'POST',
    //   url: 'http://127.0.0.1:3000/api/v1/users/login',
    //   data: { email, password },
    // });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
