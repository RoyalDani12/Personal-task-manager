import expressAsyncHandler from "express-async-handler";
import taskRepository from "../../../infrastructure/repositories/task.repository.js";
import taskDetailUsecase from "../../../core/use-case/taskUsecase/task.Detail.Usecase.js";

const taskDetailController = expressAsyncHandler(async (req, res) => {

  const { id } = req.params;
  const userId = req.user.id;

  const response = await taskDetailUsecase(
    id,
    userId,
    taskRepository
  );

  res.status(200).json({
    success: true,
    message: "Task detail fetched successfully",
    response
  });

});

export default taskDetailController;