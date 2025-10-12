import express from "express";
import multer from "multer";
import cors from "cors";

import { sessionMiddleware } from "./config/session.js";
import { passport } from "./services/passport.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

import eventCategory from "./routes/eventCategory.routes.js";
import event from "./routes/event.routes.js";
import venue from "./routes/venue.routes.js";
import eventSalesPhase from "./routes/eventSalesPhase.routes.js";
import eventToCategory from "./routes/eventToCategory.routes.js";
import order from "./routes/order.routes.js";
import ticket from "./routes/ticket.routes.js";

import defaultUserRoutes from "./routes/defaultUser.routes.js";

import { frontInstance } from "./config/env.js";

const app = express();
const route = "/eventuro/api";
app.use(express.json());

const upload = multer();
app.use(upload.none());

app.use(
  cors({
    origin: `http://${frontInstance}:5173`,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Permite el intercambio de cookies de sesión
  })
);

app.use(sessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

// Montar rutas

app.use(route + "/defaultUser", defaultUserRoutes); // usuario no-google o manual

app.use(authRoutes);
app.use(userRoutes);
app.use(route + "/event-category", eventCategory);
app.use(route + "/event", event);
app.use(route + "/venue", venue);
app.use(route + "/event-sales-phase", eventSalesPhase);
app.use(route + "/event-to-category", eventToCategory);
app.use(route + "/orders", order);
app.use(route + "/tickets", ticket);

app.listen(4000, () =>
  console.log("Servidor corriendo en http://localhost:4000")
); // ya se encuentra en el archivo.server.js

export default app;
