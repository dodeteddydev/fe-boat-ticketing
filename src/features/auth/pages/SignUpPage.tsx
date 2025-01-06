import { useToast } from "@/hooks/use-toast";
import { Form, Formik } from "formik";
import { FormSignUp } from "../components/FormSignUp";
import { LeftSection } from "../components/LeftSection";
import { SignUpSchema, signUpValidationSchema } from "../schemas/signUpSchema";
import { signUpPayloadMapper } from "../utilities/signUpPayloadMapper";
import { useSignUp } from "../hooks/useSignUp";
import { useNavigate } from "react-router-dom";
import { pathRoutes } from "@/routes/PageRoutes";

export const SignUpPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const signUp = useSignUp();

  const onSubmit = (data: SignUpSchema) => {
    return signUp.mutate(signUpPayloadMapper(data), {
      onSuccess: (response) => {
        toast({
          duration: 1000,
          title: "Sign Up Success",
          description: `${response.message}`,
        });

        navigate(pathRoutes.signIn, { replace: true });
      },
      onError: (error) => {
        const errrorMessage = error.response?.data.errors;

        toast({
          duration: 1000,
          title: "Sign Up Failed",
          description: `${errrorMessage}`,
          variant: "destructive",
        });
      },
    });
  };

  const intialValues: SignUpSchema = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik<SignUpSchema>
      initialValues={intialValues}
      validationSchema={signUpValidationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <section className="flex max-lg:flex-col h-screen max-sm:justify-center">
          <LeftSection />

          <FormSignUp isLoading={signUp.isPending} />

          <p className="text-xs sm:hidden text-center p-5">
            Copyright &copy; {new Date().getFullYear()} Boat Ticketing
          </p>
        </section>
      </Form>
    </Formik>
  );
};
