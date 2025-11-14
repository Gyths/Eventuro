import express from "express";
import multer from "multer";
import cors from "cors";

import { sessionMiddleware } from "./config/session.js";
import { passport } from "./services/passport.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import user from "./routes/user2.routes.js"
import eventCategory from "./routes/eventCategory.routes.js";
import event from "./routes/event.routes.js";
import order from "./routes/order.routes.js";
import ticket from "./routes/ticket.routes.js";
import audit from "./routes/audit.routes.js";
import discount from "./routes/discount.routes.js"
import organizerRoutes from "./routes/organizer.routes.js";
import defaultUserRoutes from "./routes/defaultUser.routes.js";
import reportSales from "./routes/reportSales.routes.js"
import complaint from "./routes/complaint.route.js";
import './jobs/incrementCapacityJob.js'; // Asegura que el job se inicie y se ejecute cuando le corresponda
import { config } from "./config/env.js";
const app = express();
const route = "/eventuro/api";

app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() }); // memoria

app.use(
  cors({
    origin: `${config.frontInstance}`,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Permite el intercambio de cookies de sesión
  })
);

app.use(sessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

// Montar rutas

app.use(route + "/defaultUser", defaultUserRoutes); // usuario no-google o manual
app.use(route, organizerRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(route + "/event-category", eventCategory);
app.use(route + "/event", event);
app.use(route + "/orders", order);
app.use(route + "/tickets", ticket);
app.use(route + "/audit", audit);
app.use(route + '/user', user);
app.use(route + "/discount", discount)
app.use(route + "/report", reportSales);
app.use(route + "/complaint", complaint);
app.listen(4000, () =>
  console.log("Servidor corriendo en http://localhost:4000")
); // ya se encuentra en el archivo.server.js

export default app;
