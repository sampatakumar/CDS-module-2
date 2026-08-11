const fetch = globalThis.fetch;
const base = 'http://localhost:5000/api';

(async () => {
  try {
    const email = `test-${Date.now()}@example.com`;
    const register = await fetch(`${base}/auth/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: 'Debug User', email, password: 'test1234'})
    });
    console.log('register status', register.status);
    const regData = await register.json();
    console.log('register body', regData);
    const token = regData.token;
    const create = await fetch(`${base}/blogs`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
      body: JSON.stringify({title:'Debug post', content:'Delete test'})
    });
    console.log('create status', create.status);
    const createData = await create.json();
    console.log('create body', createData);
    const del = await fetch(`${base}/blogs/${createData._id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`}
    });
    console.log('delete status', del.status);
    const delBody = await del.text();
    console.log('delete body', delBody);
  } catch (error) {
    console.error('debug error', error);
  }
})();
