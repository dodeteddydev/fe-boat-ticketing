import { InputText } from "@/components/custom/InputText";
import { useFormikContext } from "formik";
import { InputPassword } from "../../../components/custom/InputPassword";
import { SignInSchema } from "../schemas/signInSchema";
import { useNavigate } from "react-router-dom";
import { pathRoutes } from "@/routes/PageRoutes";
import { ButtonCustom } from "@/components/custom/ButtonCustom";

type FormSignInProps = {
  isLoading: boolean;
};

export const FormSignIn = ({ isLoading }: FormSignInProps) => {
  const navigate = useNavigate();
  const { values, setFieldValue, errors, touched } =
    useFormikContext<SignInSchema>();

  return (
    <div className="w-[60%] max-lg:w-full max-lg:h-full flex justify-center items-center max-sm:items-start">
      <div className="w-3/5 grid gap-5">
        <h1 className="text-2xl font-semibold">Sign In</h1>

        <InputText
          id="identifier"
          label="Email or Username"
          placeholder="Enter your email or username"
          value={values.identifier}
          onChange={(e) => setFieldValue("identifier", e.target.value)}
          error={touched.identifier && Boolean(errors.identifier)}
          errorMessage={errors.identifier}
        />

        <InputPassword
          id="password"
          label="Password"
          value={values.password}
          onChange={(e) => setFieldValue("password", e.target.value)}
          error={touched.password && Boolean(errors.password)}
          errorMessage={errors.password}
        />

        <div>
          <ButtonCustom
            isLoading={isLoading}
            text="Sign In"
            className="w-full"
            type="submit"
          />

          <p className="text-sm text-center mt-1">
            Don't have an account?
            <button
              className="underline"
              onClick={() => navigate(pathRoutes.signUp, { replace: true })}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
