const express = require('express');
const app = express();
const port = 3000;

app.get('/create-link', (req, res) => {
  const { target, value, data, deadline } = req.query;

  if (!target || !value || !data || !deadline) {
    return res.status(400).send('Missing required parameters');
  }

  // ساخت لینک عمومی برای تراکنش
  const link = `https://your-frontend.com/tx?target=${target}&value=${value}&data=${data}&deadline=${deadline}`;
  
  res.json({ link });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});