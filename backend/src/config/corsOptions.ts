import allowedOrigins from "./allowedOrigins";

const corsOptions = {
  // origin: (origin, callback) => {
  // allow requests with no origin
  // (like mobile apps or curl requests)
  // if(!origin) return callback(null, true);
  //   if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
  //     return callback(null, true);
  //   } else {
  //    return callback(new Error("Not allowed by CORS"), false);
  //   }
  // },
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
