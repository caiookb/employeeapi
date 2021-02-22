const Employees = require("../model/employee");
const jwt = require("jsonwebtoken");

const decoded = async (req) => {
  const {
    headers: { auth },
  } = req;
  const userDecoded = await jwt.decode(auth);
  return userDecoded.user;
};

module.exports = {
  createEmployee: async (req, res) => {
    try {
      const { name, birth_date, gender, email, cpf, start_date } = req.body;
      console.log(req.body);
      if (!name || !birth_date || !gender || !cpf || !email || !start_date)
        return res.status(400).send({ error: "Dados insuficientes!" });

      const userDecoded = await decoded(req);
      req.body.userId = userDecoded._id;

      const employees = await Employees.create(req.body);
      const allEmployees = await Employees.find({ userId: userDecoded._id });

      return res.status(201).send({ employees, allEmployees });
    } catch (err) {
      return res
        .status(500)
        .send({ error: "Ocorreu algum erro na requisssição" });
    }
  },
  getEmployeesByUser: async (req, res) => {
    try {
      const userDecoded = await decoded(req);
      const employees = await Employees.find({ userId: userDecoded._id });
      return res.status(200).send({ employees });
    } catch (err) {
      res.status(500).send({ error: "Ocorreu algum erro na requisição" });
    }
  },
  deleteEmployeesById: async (req, res) => {
    try {
      const { employee_id } = req.body;
      const userDecoded = await decoded(req);

      await Employees.remove({
        _id: employee_id,
        userId: userDecoded._id,
      });

      const allEmployees = await Employees.find({ userId: userDecoded._id });

      res.status(200).send({
        employees: allEmployees,
        message: "Funcionário apagado com sucesso!",
      });
    } catch (err) {
      res.status(500).send({ error: "Ocorreu algum erro na requisição" });
    }
  },
  updateEmployeeById: async (req, res) => {
    try {
      const { _id } = req.body;
      const newValues = req.body;
      const userDecoded = await decoded(req);
      const update = await Employees.findByIdAndUpdate(
        {
          userId: userDecoded._id,
          _id: _id,
        },
        { ...newValues },
        { useFindAndModify: true }
      );

      const allEmployees = await Employees.find({ userId: userDecoded._id });

      res.status(200).send({
        update,
        employees: allEmployees,
        message: "Meta atualizada com sucesso!",
      });
    } catch (err) {
      res.status(500).send({ error: "Ocorreu algum erro na requisição" });
    }
  },
  getEmployeeById: async (req, res) => {
    try {
      const userDecoded = await decoded(req);
      const { id } = req.params;

      const employee = await Employees.findOne({
        userId: userDecoded._id,
        _id: id,
      });

      return res.status(200).send(employee);
    } catch (err) {
      res.status(500).send({ error: "Ocorreu algum erro na requisição" });
    }
  },
};
