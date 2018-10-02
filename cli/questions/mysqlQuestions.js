const database = (defaultAnswer) => {
  return {
    type   : 'input',
    message: 'What is the name of the MySQL DATABASE to be used?',
    default: defaultAnswer,
    name   : 'database',
  };
};

const username = (defaultAnswer) => {
  return {
    type   : 'input',
    message: 'What is the USER NAME for your MySQL database?',
    default: defaultAnswer,
    name   : 'username',
  };
};

const password = (defaultAnswer) => {
  return {
    type   : 'input',
    message: 'What is the PASSWORD for your MySQL database?',
    default: defaultAnswer,
    name   : 'password',
  };
};

module.exports = (defaultDatabase, defaultUsername, defaultPassword) => {
  return [
    database(defaultDatabase),
    username(defaultUsername),
    password(defaultPassword),
  ];
};
