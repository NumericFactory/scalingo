const model = require('../models');
const bcrypt = require('bcrypt');
const beds24Service = require('../services/beds24.service');

// SINGUP USER IN THE DATABASE
exports.signup = (req, res) => {
  res.status(200).json('ok signup')
}

// GETS A SINGLE USER FROM THE DATABASE
exports.getUsers = (req, res) => {
  model.User.findAll()
    .then(
      users => {
        if (!users) return res.status(404).json("No user found.");
        res.status(200).json({ users: users, status: 200 });
      }
    )
    .catch(
      err => { res.status(500).json("There was a problem finding the users.") }
    );
}

// GETS A SINGLE USER FROM THE DATABASE
exports.getUser = (req, res) => {
  model.User.findByPk(req.params.id)
    .then(
      user => {
        if (!user) return res.status(404).json("No user found.");
        res.status(200).json(user);
      }
    )
    .catch(
      err => { res.status(500).json("There was a problem finding the user.") }
    );
}

// DELETE A USER IN THE DATABASE
exports.deleteUser = (req, res) => {
  model.User.destroy({
    where: { id: req.params.id }
  })
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({ error: 'Cannot delete user. Try later.', status: 500 }))
}

exports.updateUser = async (req, res) => {
  const { email, firstname, lastname, mobilephone, address, postalcode, city, country } = req.body;

  model.User.update(
    { email, firstname, lastname, mobilephone, address, postalcode, city, country },
    { where: { id: req.params.id } })
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({ error: 'Cannot update user. Try later.', status: 500 }))
}

// ADD A USER IN THE DATABASE
exports.add = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let address = req.body.address;
  let postalcode = req.body.postalcode;
  let city = req.body.city;
  let country = req.body.country;
  let mobilephone = req.body.mobilephone;

  if (email == null || password == null) {
    return res.status(400).json({ 'error': 'missing parameters' });
  }
  // Vérifier si user exist
  model.User.findOne({
    attributes: ['email'],
    where: { email: email }
  })
    .then((userFound) => {
      if (!userFound) {
        bcrypt.hash(password, 5, (err, bcryptedPassword) => {
          let newUser = model.User.create({
            email: email,
            password: bcryptedPassword,
            firstname: firstname,
            lastname: lastname,
            address: address,
            postalcode: postalcode,
            city: city,
            country: country,
            isadmin: 0,
            mobilephone: mobilephone
          })
            .then((newUser) => {
              return res.status(201).json({
                'userId': newUser.id
              })
            })
            .catch(err => {
              return res.status(500).json({ 'error': 'cannot add user' });
            })
        })
      } else {
        return res.status(409).json({ 'error': 'user already exists' });
      }
    })
    .catch(err => {
      return res.status(500).json({ 'error': 'unable to verify user' });
    })
} // fin users.add()



exports.addApikeyBeds24 = async (req, res) => {
  const { id, apikeybeds24 } = req.body;
  model.User.findByPk(id)
    .then(
      user => {
        if (!user) {
          return res.status(404).json("No user found.")
        }
        else {
          user.apikeybeds24 = apikeybeds24;
          user.save()
            .then(response => res.status(200).json({ user: response, status: 200 }))
            .catch(err => res.status(500).json('There was a problem updating the api key'))
        }
      }
    )
    .catch(
      err => { res.status(500).json("There was a problem finding the user.") }
    );
}



exports.apibeds24GetProperties = async (req, res) => {
  model.User.findByPk(req.params.id)
    .then(
      user => {
        if (!user) {
          return res.status(404).json("No user found.")
        } else {
          beds24Service.getProperties(user.apikeybeds24)
            .then(response => {
              // console.log(response);
              if (response.data.error) {
                res.status(401).json({
                  error: response.data.error,
                  errorCode: response.data.errorCode,
                  status: 401
                })
              }
              else {
                let properties = response.data.getProperties;
                res.status(200).json({ properties: properties, status: 200 })
              }
            })
            .catch(
              err => { res.status(500).json("There was a problem finding properties from Beds24.") }
            );
          // res.status(200).json(user);
        }
      }
    )
    .catch(
      err => { res.status(500).json("There was a problem finding the user.") }
    );


}