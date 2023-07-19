const express = require("express");
const {
  getTasks,
  deleteTask,
  createTask,
  getTask,
  updateTask,
} = require("../controller/tasks");
const router = express.Router();

router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTask).delete(deleteTask).patch(updateTask);

module.exports = router;
