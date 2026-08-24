const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors")

dotenv.config({ path: "./config/.env" });

const app = express();

const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT;

//Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//Importing Routes
const contactRoutes = require("./routes/contact.routes");
const eventRoutes = require("./routes/event.routes");
const galleryRoutes = require("./routes/gallery.routes");
const noticeRoutes = require("./routes/notice.routes");
const teacherRoutes = require("./routes/teacher.routes");


//Using Routes
app.use("/api/contact",contactRoutes);
app.use("/api/event",eventRoutes);
app.use("/api/gallery",galleryRoutes);
app.use("/api/notice",noticeRoutes);
app.use("/api/teacher",teacherRoutes);

app.get("/", (req, res) => {
    return res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});