import { z } from "zod";

const profileImageSchema = z
  .any()
  .refine(
    (file) => {
      if (!file) return true; // image is optional
      return file instanceof File && file.size > 0;
    },
    {
      message: "Invalid file.",
    }
  )
  .refine(
    (file) => {
      if (!file) return true;
      return file.type.startsWith("image/");
    },
    {
      message: "File must be an image.",
    }
  )
  .refine(
    (file) => {
      if (!file) return true;
      return file.size <= 5 * 1024 * 1024;
    },
    {
      message: "Image size must be under 5MB.",
    }
  );

export const signUpFormSchema = z
  .object({
    username: z.string(),
    email: z.string().email({ message: "This must be a valid email." }),
    password: z
      .string()
      .min(8, "The password cannot be less than 8 characters.")
      .max(15, "The password cannot be more than 15 characters long."),
    confirmPassword: z.string(),
    profileImage: profileImageSchema,
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    }
  );

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().nonempty("Please enter password"),
});
