import { ButtonCustom } from "@/components/custom/ButtonCustom";
import { InputText } from "@/components/custom/InputText";
import { pathRoutes } from "@/routes/PageRoutes";
import { useFormikContext } from "formik";
import { useNavigate } from "react-router-dom";
import { InputPassword } from "../../../components/custom/InputPassword";
import { SignUpSchema } from "../schemas/signUpSchema";

type FormSignUpProps = {
  isLoading: boolean;
};

export const FormSignUp = ({ isLoading }: FormSignUpProps) => {
  const navigate = useNavigate();
  const { values, setFieldValue, errors, touched } =
    useFormikContext<SignUpSchema>();

  return (
    <div className="w-[60%] max-lg:w-full max-lg:h-full flex justify-center items-center max-sm:items-start">
      <div className="w-3/5 grid gap-5">
        <h1 className="text-2xl font-semibold">Sign In</h1>

        <InputText
          id="email"
          label="Email"
          placeholder="Enter your email"
          value={values.email}
          onChange={(e) => setFieldValue("email", e.target.value)}
          error={touched.email && Boolean(errors.email)}
          errorMessage={errors.email}
        />

        <InputText
          id="username"
          label="Username"
          placeholder="Enter your username"
          value={values.username}
          onChange={(e) => setFieldValue("username", e.target.value)}
          error={touched.username && Boolean(errors.username)}
          errorMessage={errors.username}
        />

        <InputPassword
          id="password"
          label="Password"
          value={values.password}
          onChange={(e) => setFieldValue("password", e.target.value)}
          error={touched.password && Boolean(errors.password)}
          errorMessage={errors.password}
        />

        <InputPassword
          id="confirmPassword"
          label="Confirm Password"
          value={values.confirmPassword}
          onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
          error={touched.confirmPassword && Boolean(errors.confirmPassword)}
          errorMessage={errors.confirmPassword}
        />

        <div>
          <ButtonCustom
            isLoading={isLoading}
            text="Sign Up"
            className="w-full"
            type="submit"
          />

          <p className="text-sm text-center mt-1">
            Don't have an account?
            <button
              className="underline"
              onClick={() => navigate(pathRoutes.signIn, { replace: true })}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
