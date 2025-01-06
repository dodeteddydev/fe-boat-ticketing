import { Form, Formik } from "formik";
import { FormSignIn } from "../components/FormSignIn";
import { LeftSection } from "../components/LeftSection";
import { useAuth } from "../contexts/useAuth";
import { SignInSchema, signInValidationSchema } from "../schemas/signInSchema";
import { useToast } from "@/hooks/use-toast";
import { useSignIn } from "../hooks/useSignIn";
import { signInPayloadMapper } from "../utilities/signInPayloadMapper";

export const SignInPage = () => {
  const { toast } = useToast();
  const { setSession } = useAuth();
  const signIn = useSignIn();

  const onSubmit = (data: SignInSchema) => {
    return signIn.mutate(signInPayloadMapper(data), {
      onSuccess: (response) => {
        toast({
          duration: 1000,
          title: "Sign In Success",
          description: `${response.message}`,
        });

        setSession(response.data.accessToken, response.data.role);
      },
      onError: (error) => {
        const errrorMessage = error.response?.data.errors;

        toast({
          duration: 1000,
          title: "Sign In Failed",
          description: `${errrorMessage}`,
          variant: "destructive",
        });
      },
    });
  };

  const intialValues: SignInSchema = {
    identifier: "",
    password: "",
  };

  return (
    <Formik<SignInSchema>
      initialValues={intialValues}
      validationSchema={signInValidationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <section className="flex max-lg:flex-col h-screen max-sm:justify-center">
          <LeftSection />

          <FormSignIn isLoading={signIn.isPending} />

          <p className="text-xs sm:hidden text-center p-5">
            Copyright &copy; {new Date().getFullYear()} Boat Ticketing
          </p>
        </section>
      </Form>
    </Formik>
  );
};
