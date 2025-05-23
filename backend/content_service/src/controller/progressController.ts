import { Request, Response } from "express";
import CustomError from "../utils/customError";
import { getUserCourseProgressService, updateLessonProgressService } from "../services/progressService";

interface AuthRequest extends Request {
    user?: { _id: string };
  }

export const updateLessonProgress = async( req: AuthRequest, res: Response) => {
    if (!req.user || !req.user._id) {
        throw new CustomError("Unauthorized access. User ID not found.", 401);
    }
    const userId = req.user._id;
    const { courseId, lessonId } = req.body;

    const { progress } = await updateLessonProgressService( userId, courseId, lessonId);

    res.status(200).json({ status:"success", message: "propgress updated successfully", data:progress});
};

export const getUserCourseProgress = async (req: AuthRequest, res: Response) => {
    if (!req.user || !req.user._id) {
        throw new CustomError("Unauthorized access. User ID not found.", 401);
    }
    const userId = req.user._id;
    const { courseId } = req.params;
  
    const { progress } = await getUserCourseProgressService( userId, courseId);
  
    res.status(200).json({ status:"success", message: "propgress fetched successfully", data:progress});
};


  