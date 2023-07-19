const express = require("express");
const {
  getJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} = require("../controller/jwt");

const router = express.Router();

router.route("/jobs").get(getJobs).post(createJob);
router
  .route("/jobs/:id")
  .get(getJob)
  .post(createJob)
  .delete(deleteJob)
  .patch(updateJob);

module.exports = router;
