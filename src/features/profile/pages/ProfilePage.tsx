import { InputText } from "@/components/custom/InputText";
import { useGetProfile } from "../hooks/useGetProfile";
import { InputPassword } from "@/components/custom/InputPassword";
import { Form, Formik, FormikHelpers } from "formik";
import {
  ProfileFormSchema,
  profileValidationSchema,
} from "../schemas/profileSchema";
import { ButtonCustom } from "@/components/custom/ButtonCustom";
import { profilePayloadMapper } from "../utilities/profilePayloadMapper";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { toast } from "@/hooks/use-toast";
import { AlertDialogCustom } from "@/components/custom/AlertDialogCustom";
import { useState } from "react";
import { useAuth } from "@/features/auth/contexts/useAuth";
import noData from "@/assets/no-data.svg";
import waiting from "@/assets/waiting.svg";
import { useSignOut } from "@/features/auth/hooks/useSignOut";

export const ProfilePage = () => {
  const { data, isFetching, isError } = useGetProfile();
  const dataProfile = data?.data;
  const { removeSession } = useAuth();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const updateProfile = useUpdateProfile();
  const signOut = useSignOut();

  const onSubmit = (
    data: ProfileFormSchema,
    formik: FormikHelpers<ProfileFormSchema>
  ) => {
    return updateProfile.mutate(profilePayloadMapper(data), {
      onSuccess: () => {
        setOpenAlertDialog(true);
      },
      onError: (error) => {
        const errrorMessage = error.response?.data.errors;

        toast({
          duration: 1000,
          title: "Sign In Failed",
          description: `${errrorMessage}`,
          variant: "destructive",
        });

        formik.resetForm();
      },
    });
  };

  const onSignOut = () => {
    return signOut.mutate(undefined, {
      onSuccess: () => {
        removeSession();
      },
      onError: () => {
        toast({
          duration: 1000,
          title: "Something Error",
          description: "Redirect to Sign In Page",
          variant: "destructive",
        });
        removeSession();
      },
    });
  };

  const initialValues: ProfileFormSchema = {
    username: dataProfile?.username ?? "",
    email: dataProfile?.email ?? "",
    password: "",
  };

  return (
    <>
      {isError || isFetching ? (
        <div className="flex flex-col items-center">
          <img
            src={isError ? noData : waiting}
            alt="No Data"
            className="w-1/5"
          />
          <p className="text-xl">
            {isError ? "Something went wrong" : "Loading..."}
          </p>
        </div>
      ) : (
        <Formik<ProfileFormSchema>
          enableReinitialize
          initialValues={initialValues}
          validationSchema={profileValidationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form>
              <div className="grid gap-3">
                <InputText
                  id="username"
                  label="Username"
                  placeholder="Enter your username"
                  value={values.username}
                  onChange={(e) => setFieldValue("username", e.target.value)}
                  error={touched.username && Boolean(errors.username)}
                  errorMessage={errors.username}
                />

                <InputText
                  id="email"
                  label="Email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  error={touched.email && Boolean(errors.email)}
                  errorMessage={errors.email}
                />

                <InputPassword
                  id="password"
                  label="Password"
                  value={values.password}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  error={touched.password && Boolean(errors.password)}
                  errorMessage={errors.password}
                />

                <div className="text-end">
                  <ButtonCustom
                    isLoading={updateProfile.isPending}
                    disabled={updateProfile.isPending}
                    type="submit"
                    text="Save"
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}

      <AlertDialogCustom
        alertDialogTitle="Update Profile Successfully?"
        alertDialogDescription="For security reasons, please log in again to continue."
        openAlertDialog={openAlertDialog}
        actionAlertDialog={onSignOut}
      />
    </>
  );
};
