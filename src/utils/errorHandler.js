export const errorHandler = (err, c) => {
  console.error("Error:", err);

  if (err.message === "Validation error") {
    return c.json(
      {
        error: {
          message: "Validation failed",
          details: err.details || [],
        },
      },
      400,
    );
  }

  if (err.message === "Not found") {
    return c.json(
      {
        error: {
          message: "Resource not found",
        },
      },
      404,
    );
  }

  return c.json(
    {
      error: {
        message: "Internal server error",
      },
    },
    500,
  );
};
