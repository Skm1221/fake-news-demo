var express = require('express');
var app = express();

app.use('*', (req, res) => {
  res.render('index');
});

app.set('views', `${__dirname}/template`);
app.set('view engine', 'ejs');


app.use(express.static(`${__dirname}/../static`));
app.use('/node_modules/', express.static(`${__dirname}/../node_modules`));

app.listen(3000, function(){
  console.log("Express server has started on port 3000")
});
