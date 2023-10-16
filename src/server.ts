import { app } from "./app";

const PORT = 3333;

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || PORT}`);
});
