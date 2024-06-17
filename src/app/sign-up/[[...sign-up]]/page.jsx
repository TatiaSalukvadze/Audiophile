import { SignUp } from "@clerk/nextjs";
import "../../sign-in/[[...sign-in]]/signForm.css";

function SignUpPage() {
  return (
    <span className="signForms">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </span>
  );
}

export default SignUpPage;
