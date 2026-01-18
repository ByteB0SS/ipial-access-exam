if (!localStorage.getItem("db")) {
  localStorage.setItem(
    "db",
    '{"courses":[{"id":"1","name":"Construção Civil"},{"id":"2","name":"informática"},{"id":"3","name":"Eletronica e Telecomunicações"},{"id":"4","name":"Eletricidade"}],"admins":[{"id":"f7e8aa73-56ed-4dd3-881c-e7104fea4f95","userName":"admin","password":"senha complicada"}],"session":[],"candidates":[]}'
  );
}
