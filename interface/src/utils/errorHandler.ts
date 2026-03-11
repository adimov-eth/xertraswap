import { toast } from "react-toastify";

export const handleError = (error: unknown): void => {
  let message = "Something went wrong";

  if (error instanceof Error) {
    message = error.message;
  }

  // Handle API-style errors (Axios, fetch wrappers, etc.)
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const err = error as any;
    message = err?.response?.data?.message ?? message;
  }

  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
  });

  console.error("Global Error:", error);
};