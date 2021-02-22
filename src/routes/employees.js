const express = require("express");
const router = express.Router();
const EmployeesController = require("../controllers/employee-controller");
const auth = require("../middlewares/auth");

router.post("/create", auth, EmployeesController.createEmployee);
router.get("/list", auth, EmployeesController.getEmployeesByUser);
router.get("/list/:id", auth, EmployeesController.getEmployeeById);
router.delete("/delete", auth, EmployeesController.deleteEmployeesById);
router.put("/update", auth, EmployeesController.updateEmployeeById);

module.exports = router;
