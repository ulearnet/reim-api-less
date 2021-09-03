const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: path.resolve(
    __dirname,
    (process.env.NODE_ENV || "development") + ".env"
  ),
});
const serverless = require("serverless-http");
const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const multer = require("multer");

const indexRouter = require("./routes/index");
const tiempoactividadRouter = require("./routes/tiempoactividad");
const alumno_respuestaRouter = require("./routes/alumno_respuesta");
const item_altRouter = require("./routes/item_alt");
const asigna_reim_alumnoRouter = require("./routes/asigna_reim_alumno");
const item_router = require("./routes/item");
const alternativa_router = require("./routes/alternativa");
const Dibujo_reimRouter = require("./routes/Dibujo_reim");
const Inventario_reimRouter = require("./routes/Inventario_reim");
const Reaccion_dibujoRouter = require("./routes/Reaccion_dibujo");
const Opinion_dibujoRouter = require("./routes/Opinion_dibujo");
const aprueba_router = require("./routes/aprueba");
const catalogo_reim_router = require("./routes/catalogo_reim");
const detalle_usuarioRouter = require("./routes/detalle_usuario");
const transaccion_reim_router = require("./routes/transaccion_reim");
const usuario_router = require("./routes/usuario");

const main = express();
main.use(bodyParser.urlencoded({ extended: true }));
// view engine setup
main.set("views", path.join(__dirname, "views"));
main.set("view engine", "pug");

main.use(cors());
main.use(logger("dev"));
main.use(express.json());
main.use(express.urlencoded({ extended: false }));
main.use(cookieParser());
main.use(express.static(path.join(__dirname, "public")));

main.use("/api", indexRouter);
main.use("/api/tiempoxactividad", tiempoactividadRouter);
main.use("/api/alumno_respuesta", alumno_respuestaRouter);
main.use("/api/item_alt", item_altRouter);
main.use("/api/asigna_reim_alumno", asigna_reim_alumnoRouter);
main.use("/api/item", item_router);
main.use("/api/alternativa", alternativa_router);
main.use("/api/Dibujo_reim", Dibujo_reimRouter);
main.use("/api/Inventario_reim", Inventario_reimRouter);
main.use("/api/Reaccion_dibujo", Reaccion_dibujoRouter);
main.use("/api/Opinion_dibujo", Opinion_dibujoRouter);
main.use("/api/aprueba", aprueba_router);
main.use("/api/catalogo_reim", catalogo_reim_router);
main.use("/api/detalle_usuario", detalle_usuarioRouter);
main.use("/api/transaccion_reim", transaccion_reim_router);
main.use("/api/usuario", usuario_router);

// catch 404 and forward to error handler
main.use(function (req, res, next) {
  next(createError(404));
});

// error handler
main.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//cron jobs


module.exports.handler = serverless(main);
