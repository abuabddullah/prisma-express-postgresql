import prisma from "../../../DB/db.config.js";

// * Create the course
export const createCourse = async (req, res) => {
  const { title, user_id } = req.body;

  const newCourse = await prisma.course.create({
    data: {
      title,
      user_id: Number(user_id),
    },
  });

  return res.json({ status: 200, data: newCourse, msg: "Course created." });
};

// * Get all the courses
export const fetchCourses = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  if (page <= 0) {
    page = 1;
  }
  if (limit <= 0 || limit > 100) {
    limit = 10;
  }
  const skip = (page - 1) * limit;
  const courses = await prisma.course.findMany({
    skip: skip,
    take: limit,
    include: {
      user: {
        select: {
          name: true,
          id: true,
        },
      },
      students: true,
    },
  });

  //   * to get the total courses count
  const totalCourses = await prisma.course.count();
  const totalPages = Math.ceil(totalCourses / limit);
  return res.json({
    status: 200,
    data: courses,
    meta: {
      totalPages,
      currentPage: page,
      limit: limit,
    },
  });
};

// * Get the course by id
export const showCourse = async (req, res) => {
  const courseId = req.params.id;
  const course = await prisma.course.findFirst({
    where: {
      id: Number(courseId),
    },
    include: {
      user: {
        select: {
          name: true,
          id: true,
        },
      },
      students: true,
    },
  });

  return res.json({ status: 200, data: course });
};

// * Update the course
export const updateCourse = async (req, res) => {
  const courseId = req.params.id;
  const { title } = req.body;

  const updatedCourse = await prisma.course.update({
    where: {
      id: Number(courseId),
    },
    data: {
      title,
    },
  });

  return res.json({ status: 200, data: updatedCourse, msg: "Course updated." });
};

// * Delete the course
export const deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  await prisma.course.delete({
    where: {
      id: Number(courseId),
    },
  });

  return res.json({ status: 200, msg: "Course deleted." });
};

// * Enroll the course
export const enrollCourse = async (req, res) => {
  const courseId = req.params.id;
  // const userId = req.user.id; // * get the user id from the middleware jwt
  const userId = req.body.user_id;
  const course = await prisma.course.findFirst({
    where: {
      id: Number(courseId),
    },
    include: {
      students: true,
    },
  });

  if (!course) {
    return res.json({ status: 404, msg: "Course not found" });
  }

  //   * check if the user is already enrolled in the course
  const isEnrolled = course.students.some(
    (student) => student.user_id === userId
  );

  if (isEnrolled) {
    return res.json({ status: 400, msg: "You are already enrolled" });
  }

  //   * add the user in the student collection
  await prisma.student.create({
    data: {
      user_id: userId,
      courses: {
        connect: {
          id: Number(courseId),
        },
      },
    },
  });

  return res.json({ status: 200, msg: "Enrolled successfully" });
};
