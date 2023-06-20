const express = require('express');
const app = express();
const carroRoutes = express.Router();

let Carro = require('../model/Carro');

// api to add carro
carroRoutes.route('/add').post(function (req, res) {
  let carro = new Carro(req.body);
  carro.save()
  .then(carro => {
    res.status(200).json({'status': 'success','mssg': 'carro added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get carros
carroRoutes.route('/').get(function (req, res) {
  Carro.find(function (err, carros){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','carros': carros});
    }
  });
});

// api to get carro
carroRoutes.route('/carro/:id').get(function (req, res) {
  let id = req.params.id;
  Carro.findById(id, function (err, carro){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','carro': carro});
    }
  });
});

// api to update route
carroRoutes.route('/update/:id').put(function (req, res) {
    Carro.findById(req.params.id, function(err, carro) {
    if (!carro){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        carro.name = req.body.name;
        carro.email = req.body.email;
        carro.phone_number = req.body.phone_number;

        carro.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
carroRoutes.route('/delete/:id').delete(function (req, res) {
  Carro.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = carroRoutes;