import express from 'express';
import data from './data.js';

const app = express();
const port = 8000;

app.use(express.json());
app.get("/users", (req, res) => {
  res.json(data.users);
});

// GET USER BY ID
app.get("/users/:id", (req, res) => {
  const user = data.users.find(u => u.id == req.params.id);

  if (!user) return res.status(404).json({ msg: "User not found" });

  res.json(user);
});

// CREATE USER
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  const newUser = {
    id: data.users.length ? data.users[data.users.length - 1].id + 1 : 1,
    name,
    email
  };

  data.users.push(newUser);

  res.json({ msg: "User added", user: newUser });
});

// UPDATE USER
app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const user = data.users.find(u => u.id == req.params.id);

  if (!user) return res.status(404).json({ msg: "User not found" });

  user.name = name ?? user.name;
  user.email = email ?? user.email;

  res.json({ msg: "User updated", user });
});

// DELETE USER
app.delete("/users/:id", (req, res) => {
  const user = data.users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ msg: "User not found" });

  data.users = data.users.filter(u => u.id != req.params.id);

  res.json({ msg: "User deleted" });
});

app.listen(port, () => {
  console.log("Server is running in " + port);
});

