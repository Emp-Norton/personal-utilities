const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5432;

app.use(express.static('public'));

app.get('/files', (req, res) => {
  fs.readdir('public', (err, files) => {
    if (err) {
      res.status(500).send({ message: 'Error reading directory' });
    } else {
      res.send(files);
    }
  });
});

app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join('public', filename);
  res.download(filePath, filename);
});

app.post('/save', (req, res) => {
  const { language, code } = req.body;
  const filename = `new-file.${language.toLowerCase()}`;
  const filePath = path.join('public', filename);
  fs.writeFile(filePath, code, (err) => {
    if (err) {
      res.status(500).send({ message: 'Error writing file' });
    } else {
      res.send({ message: 'File saved successfully' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
