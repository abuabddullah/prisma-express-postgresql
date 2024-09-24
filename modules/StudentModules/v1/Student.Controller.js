import prisma from "../../../DB/db.config.js";

// * Get all students
export const fetchAllStudents = async (req, res) => {
  const students = await prisma.student.findMany({
    include: {
      user: {
        select: {
          name: true,
          id: true,
        },
      },
      courses: true,
    },
  });

  return res.json({ status: 200, data: students });
};
