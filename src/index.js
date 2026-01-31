const express = require('express');

const { ServerConfig, Logger } = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Sucessfully started server on PORT: ${ServerConfig.PORT}`); 

  const { City, Airport } = require('./models');
  const bengaluru = await City.findByPk(1); //city with id=1 is bangaluru
  // console.log(bengaluru);
  // const airport = await Airport.create({name: 'Kempegowda Airport', code: 'BLR', cityId: 1}); //using oops, making airport model object and calling .create() function from it.

  //const airport = await Airport.create({name: 'Kempegowda Airport', code: 'BLR'}); Throw cityId cannot be null error

  // const dbpairport = await bengaluru.createAirport({name: 'Huballi Airport', code: 'HBL'});
  // console.log(dbpairport);

  // const airportsInBlr = await bengaluru.getAirports();
  // console.log(airportsInBlr);

  // const agra = await City.findByPk(7);
  // const agrairport = await agra.createAirport({name: 'Agra Airport', code: 'IATA'});
  // console.log(agrairport);

  await City.destroy({
    where: {
      id: 1
    }
  });
});