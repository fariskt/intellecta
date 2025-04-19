import express from "express";
import { asyncErrorHandler } from "../middlewares/asyncErrorHandler";
import { authMiddleware } from "../middlewares/auth"
import { getUserCourseProgress, markLessonAsComplete, quizScoreUpdate } from "../controller/progressController";

const progressRouter = express.Router();

progressRouter.post("/update",authMiddleware, asyncErrorHandler( markLessonAsComplete ));
progressRouter.get("/:courseId",authMiddleware, asyncErrorHandler( getUserCourseProgress ));
progressRouter.post("/update/quiz-score",authMiddleware, asyncErrorHandler( quizScoreUpdate ));


export default progressRouter;
