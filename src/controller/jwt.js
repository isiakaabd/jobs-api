const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../error");
const Job = require("../models/job");
const getJob = async (req, res) => {
  const {
    user: { id: userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) throw new NotFoundError(`no Job with id of ${jobId}`);
  res.status(StatusCodes.OK).send({ sucess: true, job });
};
const getJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.id }).sort("-createdAt");
  res.status(StatusCodes.OK).json({ success: true, jobs });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.id;
  const job = await Job.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ success: true, job });
};
const deleteJob = async (req, res) => {
  const {
    user: { id: userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndRemove({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) throw new NotFoundError(`no Job with id of ${jobId}`);
  res
    .status(StatusCodes.OK)
    .send({ sucess: true, message: "Job succcessfully deleted" });
};
const updateJob = async (req, res) => {
  const {
    body: { position, company },
    user: { id: userId },
    params: { id: jobId },
  } = req;
  req.body.createdBy = req.user.id;
  if (position === "" || company == "")
    throw new BadRequestError("Enter position and company");
  const job = await Job.findOneAndUpdate(
    { createdBy: userId, _id: jobId },
    { ...req.body, createdBy: userId },
    { new: true }
  );
  if (!job) throw new NotFoundError("Job not found");
  res.status(StatusCodes.OK).json({ success: true, job });
};

module.exports = {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
  getJob,
};
