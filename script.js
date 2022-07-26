const fs = require('fs');

fs.appendFile('pictures.html', "\n</div>\n</div>\n</body>\n</html>", function (err) {
    if (err) throw err;
    console.log('All saved!');
  });
