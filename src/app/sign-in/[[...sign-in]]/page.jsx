import { SignIn } from "@clerk/nextjs";
import "./signForm.css";
function SignInPage() {
  return (
    <span className="signForms">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </span>
  );
}

export default SignInPage;
