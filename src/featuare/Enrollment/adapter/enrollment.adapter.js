export class enrollmentAdapter {
  adapt(data) {
    return {
      userId: data.userId,
      courseId: data.courseId,
      enrolledAt : data.enrolledAt,
      status: data.status,
      progress:data.progress
    };
  }
}


