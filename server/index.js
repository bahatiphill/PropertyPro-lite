import express from "express";
import propertiesRouter from "./routes/propertyRouters";
import usersRouter from "./routes/userRouters";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1", propertiesRouter);
app.use("/api/v1", usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

export default app;
