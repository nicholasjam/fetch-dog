import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import dog from "@/assets/images/dog.jpg";
import { loginValidationSchema } from "@/validations/loginValidationSchema";
import { useAuthStore } from "@/store/useAuthStore";

interface LoginFormValues {
  name: string;
  email: string;
}

const initialValues: LoginFormValues = { name: "", email: "" };

export default function Login() {
  const { login } = useAuth();
  const { setAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormValues, { setSubmitting }: FormikHelpers<LoginFormValues>) => {
    const success = await login(values.name, values.email);
    if (success) {
      setAuthenticated(true)
      navigate("/search");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200">
      <div className="bg-white p-10 rounded-xl shadow-2xl flex flex-col md:flex-row items-center w-full max-w-4xl">

        <div className="hidden md:block w-1/2">
          <img src={dog} alt="Happy Dog" className="rounded-xl shadow-lg" />
        </div>

        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Welcome Dog Lover!</h1>
          <p className="text-center text-gray-600 mb-6">Sign in to start finding your perfect pet match!</p>

          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-500" />
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-3 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-200 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account? <span className="text-orange-500 hover:underline cursor-pointer">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}
