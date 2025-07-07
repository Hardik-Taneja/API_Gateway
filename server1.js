const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

app.all('/data/:id', (req, res) => {
  res.json({
    server: 'Server 1',
    type: 'Data',
    method: req.method,
    id: req.params.id,
    body: req.body
  });
});

app.listen(PORT, () => {
  console.log(`📡 Server 1 running at http://localhost:${PORT}`);
});
