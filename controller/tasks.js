const { BadRequestError } = require("../error");
const { asynFunction } = require("../middleware");
const Task = require("../models/tasks");

const getTasks = asynFunction(async (_, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});
const createTask = asynFunction(async (req, res) => {
  await Task.create(req.body);
  res.status(201).json({ success: true, task: req.body });
});
const getTask = asynFunction(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findOne({ _id: id });
  if (!task) throw new BadRequestError(`No Task with the id: ${id}`);

  res.status(200).json({ task });
});
const deleteTask = asynFunction(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id });
  if (!task) {
    return new BadRequestError(`No Task with the id: ${id}`);
  }
  res.status(200).json({ success: true, message: "task deleted successfully" });
});
const updateTask = asynFunction(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    throw new BadRequestError(`No Task with the id: ${id}`);
  }
  res.status(200).json({ success: true, task });
});
module.exports = {
  getTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
};
