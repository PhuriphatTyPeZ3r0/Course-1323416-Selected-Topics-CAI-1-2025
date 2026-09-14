const fs = require('fs');

fs.readFile('head.txt', 'utf8', (err, headData) => {
  if (err) {
    console.error('Error reading head.txt:', err);
    return;
  }

  fs.readFile('body.txt', 'utf8', (err, bodyData) => {
    if (err) {
      console.error('Error reading body.txt:', err);
      return;
    }

    fs.readFile('leg.txt', 'utf8', (err, legData) => {
      if (err) {
        console.error('Error reading leg.txt:', err);
        return;
      }

      fs.readFile('feet.txt', 'utf8', (err, feetData) => {
        if (err) {
          console.error('Error reading feet.txt:', err);
          return;
        }

        // Concatenate all data
        const robot = headData + bodyData + legData + feetData;

        // Write to robot.txt
        fs.writeFile('robot.txt', robot, (err) => {
          if (err) {
            console.error('Error writing robot.txt:', err);
            return;
          }
          console.log('robot.txt created successfully!');
        });
      });
    });
  });
});
