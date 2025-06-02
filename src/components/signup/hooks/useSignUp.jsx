import { useState } from "react";
import { signUpApiCall } from "../../../api/auth.api";
import { signUpFormSchema } from "../../../zod/schema";
import { getParsedErrors } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/features/user/userSlice.js";

export const useSignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData({
        ...formData,
        profileImage: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const result = signUpFormSchema.safeParse(formData);
    if (!result.success) {
      setErrors(getParsedErrors(result));
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("profileImage", formData.profileImage);

    const response = await signUpApiCall(data);

    if (response.success) {
      dispatch(setUser(response.data));
      toast.success("Signed Up Successfully");
      navigate("/");
    } else {
      // Extracts the error type from the message to show it using zod.
      const errorType = response.message.split(" ")[0].toLowerCase();
      setLoading(false);
      setErrors({
        [errorType]: response.message,
      });
    }

    setLoading(false);
  };
  return { formData, handleChange, handleSignUp, loading, errors };
};
