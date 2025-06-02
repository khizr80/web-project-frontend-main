import { useEffect, useState } from "react";
import { loginApiCall } from "../../../api/auth.api";
import { loginFormSchema } from "../../../zod/schema";
import { getParsedErrors } from "../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  // states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Zod Validation
    const result = loginFormSchema.safeParse(formData);
    if (!result.success) {
      setErrors(getParsedErrors(result));
      setLoading(false);
      return;
    }

    // Api Call
    const response = await loginApiCall(formData);

    if (response.success) {
      dispatch(setUser(response.data));
      localStorage.setItem("user", JSON.stringify(response.data));

      toast.success("Logged In");
      navigate("/");
    } else {
      console.error(response);

      // setting the error to the last input form
      setErrors({
        ...errors,
        password: response.message,
      });
    }

    setLoading(false);
  };
  return { formData, handleChange, handleLogin, loading, errors };
};
